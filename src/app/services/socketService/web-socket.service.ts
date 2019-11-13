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

    return new Observable(subscriber => {
      this.socket.on("connect", () => {
        this.terminal.pushToTerminal("Socket connected.");
        subscriber.next({ connected: true });
      });
    });
  }

  closeConnection() {
    return new Observable(subscriber => {
      this.socket.on("disconnect", () => {
        subscriber.next({ connected: false });
      });

      this.socket.close();
    });
  }
}
