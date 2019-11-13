import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
// import * as socketType from "socket.io";
import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";
import { AppTerminalService } from "../terminalService/app-terminal.service";

@Injectable({
  providedIn: "root"
})
export class WebSocketService {
  socket: any;
  readonly apiUrl: string = environment.apiUrl;

  constructor(private terminal: AppTerminalService) {}

  connectToServer(xToken: string, testUrl?: string) {
    let transportOptions = {
      polling: {
        extraHeaders: {
          "x-token": xToken
        }
      }
    };

    this.socket = io(testUrl || this.apiUrl, {
      transportOptions
    });

    let terminal = this.terminal;

    return new Observable(subscriber => {
      this.socket.on("connect", () => {
        terminal.pushToTerminal("Socket connected.");
        subscriber.next({ connected: true });
      });
      this.socket.on("reconnecting", () => {
        terminal.pushToTerminal("connect_failed, reconnecting...");
      });
      this.socket.on("connect_failed", () => {
        terminal.pushToTerminal("connect_failed");
      });
      this.socket.on("error", err => {
        terminal.pushToTerminal("Socket ERROR : " + JSON.stringify(err));
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
    return new Observable(subscriber => {
      subscriber.next({ eventName, emitted: true });
    });
  }

  listen(eventName: string) {
    return new Observable(subscriber => {
      this.socket.on(eventName, (...data: any) => {
        subscriber.next(data);
      });
    });
  }

  closeConnection() {
    return new Observable(subscriber => {
      this.socket.on("disconnect", () => {
        subscriber.next({ connected: false });
        this.terminal.pushToTerminal("Socket disconnected.");
      });

      this.socket.close();
    });
  }
}
