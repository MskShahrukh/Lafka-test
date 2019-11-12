import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import * as socketType from "socket.io";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class WebSocketService {
  socket: socketType;
  readonly uri: string = "https://tests.lafka.tools";

  constructor() {}

  listen(eventName: string) {
    return new Observable(subscriber => {
      this.socket.on(eventName, (...data: any) => {
        // console.log("listen data >>> ", data);
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  connectToServer(xToken: string) {
    let transportOptions = {
      polling: {
        extraHeaders: {
          "x-token": xToken
        }
      }
    };

    this.socket = io(this.uri, {
      // query: { transport: "websocket",  "x-token": xToken }
      // transports: ["websocket"],
      transportOptions
    });

    this.socket.on("disconnect", d => {
      console.log("Socket disconnected.");
    });

    this.socket.on("connect", d => {
      console.log("Socket connected.");

      this.emit("channel", {});
    });
  }

  closeSocket() {
    this.socket.close();
  }
}
