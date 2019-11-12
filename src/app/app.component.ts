import { Component, OnInit } from "@angular/core";

import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { WebSocketService } from "./web-socket.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
@Injectable()
export class AppComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private WebSocketService: WebSocketService
  ) {}

  title = "test";
  socket = null;
  url = "https://tests.lafka.tools";
  config = null;
  token = {};

  ngOnInit() {
    // this.runSocketProcess();
  }

  getConfig() {
    return this.http.post(this.url + "/token", {});
  }

  runSocketProcess() {
    // # Step 1 (Get token)
    this.http.post(this.url + "/token", {}).subscribe((data: any) => {
      console.log("HTTP POST /token >>> ", data);
      this.token = data;

      this.WebSocketService.connectToServer(data.token);

      this.WebSocketService.listen("channel").subscribe(channelID => {
        console.log("got a channel id.... ", channelID);

        this.WebSocketService.emit("join-room", channelID);
      });

      this.WebSocketService.listen("join-room").subscribe(room => {
        console.log("Joined a room now .... ", room);

        this.WebSocketService.emit("counter", {});
      });

      this.WebSocketService.listen("item").subscribe((item: any) => {
        console.log("Got Items >>> ", item);
        let itemA = JSON.parse(item[0]);
        console.log("itemA > ", itemA[0]);

        let itemB: any = null;
        if (item[1]) {
          itemB = item[1];
          console.log("itemB > ", itemB);
        }

        // TEN CHECK.

        if (itemA % 10 === 0) {
          console.log("tenth reached.");

          // Fetch that validateeeee !!!
          this.http
            .get(this.url + "/validate", {
              params: new HttpParams().set("token", itemB)
            })
            .subscribe(result => {
              console.log("Get Validate result >>>>>> >> !!!! ", result);
              this.WebSocketService.closeSocket();
            });
        }
      });
    });
  }
}
