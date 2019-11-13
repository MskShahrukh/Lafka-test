import { Component, OnInit } from "@angular/core";

import { WebHttpService } from "../../services/httpService/web-http.service";
import { WebSocketService } from "../../services/socketService/web-socket.service";
import { AppTerminalService } from "../../services/terminalService/app-terminal.service";
import { Auth, Connection, Room } from "../../interfaces/interfaces";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"]
})
export class InputComponent implements OnInit {
  constructor(
    private http: WebHttpService,
    private socket: WebSocketService,
    private terminal: AppTerminalService
  ) {}

  token: Auth = { token: "" };
  currentStep: number = 1;

  channelId: string = "";
  roomConnected: boolean = false;
  roomId: string = "";
  tenthMsg: string = "";
  validation: boolean;

  terminalResponses: String[] = this.terminal.terminalResponses;

  ngOnInit() {}

  authenticate() {
    this.currentStep = 0;
    this.pushToTerminal("authentication fired...");
    this.http.post("/token", {}).subscribe((auth: Auth) => {
      this.token = auth;
      this.pushToTerminal("authenticated. ", auth);
      this.connectToSocket(this.token);
    });
  }

  connectToSocket(authObj: Auth) {
    this.pushToTerminal("connectToSocket fired...");
    this.socket.connectToServer(authObj.token).subscribe((x: Connection) => {
      if (x.connected) {
        this.currentStep = 2;
      }
    });
  }

  connectToChanel() {
    this.currentStep = 0;

    this.pushToTerminal("connectToChanel fired...");
    this.socket.emit("channel", {});
    this.socket.listen("channel").subscribe((channelId: string) => {
      this.channelId = channelId;
      this.pushToTerminal("Channel Joined. ", channelId);

      this.currentStep = 3;
    });
  }

  connectToRoom() {
    this.currentStep = 0;

    this.pushToTerminal("connectToRoom fired...");
    this.socket.emit("join-room", this.channelId);
    this.socket.listen("join-room").subscribe((room: Room) => {
      this.roomConnected = true;
      this.pushToTerminal("Room Joined. ", room);

      this.currentStep = 4;
    });
  }

  getMessages() {
    this.currentStep = 0;

    this.pushToTerminal("getMessages fired...");
    this.socket.emit("counter", {});
    this.socket.listen("item").subscribe((item: string[]) => {
      this.pushToTerminal("msg >>> ", item);

      let counter = JSON.parse(item[0]);
      let msg = item[1];

      if (counter % 10 === 0) {
        this.pushToTerminal("Tenth message Reached.");
        this.tenthMsg = msg;

        this.currentStep = 5;
      }
    });
  }

  validateMsg() {
    this.currentStep = 0;

    this.pushToTerminal("validateMsg fired... ", this.tenthMsg);
    this.http
      .get("/validate", "token", this.tenthMsg)
      .subscribe((validated: boolean) => {
        this.validation = validated;

        this.pushToTerminal("**************************");
        this.pushToTerminal("Validation response : ", validated);
        this.pushToTerminal("**************************");

        this.socket.closeConnection().subscribe((x: Connection) => {
          if (x.connected === false) {
            this.currentStep = 1;
          }
        });
      });
  }

  pushToTerminal(text: string, obj?: any) {
    if (obj) {
      this.terminal.pushToTerminal(text + JSON.stringify(obj));
    } else {
      this.terminal.pushToTerminal(text);
    }
  }
}
