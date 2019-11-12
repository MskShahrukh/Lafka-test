import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import * as socketType from "socket.io";
import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";

import { AppTerminalService } from "../terminalService/app-terminal.service";

@Injectable({
  providedIn: "root"
})
export class WebSocketService {
  socket: socketType;
  readonly apiUrl: string = environment.apiUrl;

  constructor(private terminal: AppTerminalService) {}

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  listen(eventName: string) {
    return new Observable(subscriber => {
      this.socket.on(eventName, (...data: any) => {
        subscriber.next(data);
      });
    });
  }

  connectToServer(xToken: string) {
    let transportOptions = {
      polling: {
        extraHeaders: {
          "x-token": xToken
        }
      }
    };

    this.socket = io(this.apiUrl, {
      transportOptions
    });

    this.socket.on("connect", () => {
      console.log("Socket connected.");
      this.terminal.pushToTerminal("Socket connected.");
    });

    this.socket.on("disconnect", () => {
      console.log("Socket disconnected.");
      this.terminal.pushToTerminal("Socket disconnected.");
    });
  }

  closeConnection() {
    this.socket.close();
  }
}
