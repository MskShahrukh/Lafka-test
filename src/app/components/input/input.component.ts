import { Component, OnInit } from "@angular/core";

import {
  WebHttpService,
  WebSocketService,
  AppTerminalService
} from "../../services/index";

import { Auth, Connection, Room, InputButton } from "../../interfaces";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"]
})
export class InputComponent implements OnInit {
  constructor(
    private httpService: WebHttpService,
    private socketService: WebSocketService,
    private terminal: AppTerminalService
  ) {}

  buttons: InputButton[] = [
    {
      name: "Auth & Connect",
      action: () => this.authenticate()
    },

    {
      name: "Join Channel",
      action: () => this.connectToChanel()
    },

    {
      name: "Join Room",
      action: () => this.connectToRoom()
    },

    {
      name: "Get Messages",
      action: () => this.getMessages()
    },

    {
      name: "Validate",
      action: () => this.validateMsg()
    }
  ];

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
    this.httpService.post("/token", {}).subscribe((auth: Auth) => {
      this.token = auth;
      this.pushToTerminal("authenticated. ", auth);
      this.connectToSocket(this.token);
    });
  }

  connectToSocket(authObj: Auth) {
    this.pushToTerminal("connectToSocket fired...");
    this.socketService
      .connectToServer(authObj.token)
      .subscribe((x: Connection) => {
        if (x.connected) {
          this.currentStep = 2;
        }
      });
  }

  connectToChanel() {
    this.currentStep = 0;

    this.pushToTerminal("connectToChanel fired...");
    this.socketService.emit("channel", {});
    this.socketService.listen("channel").subscribe((channelId: string) => {
      this.channelId = channelId;
      this.pushToTerminal("Channel Joined. ", channelId);

      this.currentStep = 3;
    });
  }

  connectToRoom() {
    this.currentStep = 0;

    this.pushToTerminal("connectToRoom fired...");
    this.socketService.emit("join-room", this.channelId);
    this.socketService.listen("join-room").subscribe((room: Room) => {
      this.roomConnected = true;
      this.pushToTerminal("Room Joined. ", room);

      this.currentStep = 4;
    });
  }

  getMessages() {
    this.currentStep = 0;

    this.pushToTerminal("getMessages fired...");
    this.socketService.emit("counter", {});
    this.socketService.listen("item").subscribe((item: string[]) => {
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
    this.httpService
      .get("/validate", "token", this.tenthMsg)
      .subscribe((validated: boolean) => {
        this.validation = validated;

        this.pushToTerminal("**************************");
        this.pushToTerminal("Validation response : ", validated);
        this.pushToTerminal("**************************");

        this.socketService.closeConnection().subscribe((x: Connection) => {
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
