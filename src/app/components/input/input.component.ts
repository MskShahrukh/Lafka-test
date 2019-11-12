import { Component, OnInit } from "@angular/core";
import { Token } from "../../interfaces/i-token";

import { WebHttpService } from "../../services/httpService/web-http.service";
import { WebSocketService } from "../../services/socketService/web-socket.service";
import { AppTerminalService } from "../../services/terminalService/app-terminal.service";

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

  token: Token = { token: "" };
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
    this.terminal.pushToTerminal("authentication fired...");
    this.http.post("/token", {}).subscribe((auth: Token) => {
      this.token = auth;
      this.terminal.pushToTerminal("authenticated. " + JSON.stringify(auth));
      this.connectToSocket(this.token);
    });
  }

  connectToSocket(xToken: Token) {
    this.terminal.pushToTerminal("connectToSocket fired...");
    this.socket.connectToServer(xToken.token);
    this.currentStep = 2;
  }

  connectToChanel() {
    this.currentStep = 0;

    console.log("connectToChanel fired.");
    this.terminal.pushToTerminal("connectToChanel fired...");
    this.socket.emit("channel", {});
    this.socket.listen("channel").subscribe((channelId: any) => {
      this.channelId = channelId;
      console.log("this.channelId >>> ", this.channelId);

      this.terminal.pushToTerminal(
        "Channel Joined. " + JSON.stringify(channelId)
      );

      this.currentStep = 3;
    });
  }

  connectToRoom() {
    this.currentStep = 0;

    console.log("connectToRoom fired.");
    this.terminal.pushToTerminal("connectToRoom fired...");

    this.socket.emit("join-room", this.channelId);
    this.socket.listen("join-room").subscribe((room: any) => {
      this.roomConnected = true;

      console.log("Joined a room now .... ", room);
      this.terminal.pushToTerminal("Room Joined. " + JSON.stringify(room));

      this.currentStep = 4;
    });
  }

  getMessages() {
    this.currentStep = 0;

    console.log("listenMessages fired.");
    this.terminal.pushToTerminal("getMessages fired...");

    this.socket.emit("counter", {});
    this.socket.listen("item").subscribe((item: any) => {
      console.log("item >>> ", item);
      this.terminal.pushToTerminal("msg >>> " + JSON.stringify(item));

      let counter = JSON.parse(item[0]);
      let msg = item[1];

      if (counter % 10 === 0) {
        console.log("tenth reached.");
        this.terminal.pushToTerminal("Tenth message Reached.");
        this.tenthMsg = msg;

        this.currentStep = 5;
      }
    });
  }

  validateMsg() {
    this.currentStep = 0;
    console.log("validateMsg fired.");
    this.terminal.pushToTerminal(
      "validateMsg fired... " + JSON.stringify(this.tenthMsg)
    );
    this.http
      .get("/validate", "token", this.tenthMsg)
      .subscribe((validatedObj: any) => {
        this.validation = validatedObj;
        console.log("validation >>>> ", this.validation);

        this.terminal.pushToTerminal(
          "********************************************"
        );

        this.terminal.pushToTerminal(
          "Validation response : " + JSON.stringify(validatedObj)
        );
        this.terminal.pushToTerminal(
          "********************************************"
        );

        this.socket.closeConnection();

        this.currentStep = 1;
      });
  }

  pushtoTerminal(data: string) {
    this.terminal.pushToTerminal(data);
  }
}
