import { TestBed } from "@angular/core/testing";
// import { WebSocket, Server } from "mock-socket";
// import * as io from "socket.io-client";

import { WebSocketService } from "./web-socket.service";

describe("WebSocketService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [WebSocketService]
    });

    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  const dummyAuth = { token: "34f92607-57c0-4894-91a1-f0248d096843" };

  it("should be created", () => {
    const service: WebSocketService = TestBed.get(WebSocketService);
    expect(service).toBeTruthy();
  });

  it("connectToServer should make connection with token", async (done: DoneFn) => {
    const service: WebSocketService = TestBed.get(WebSocketService);
    service.connectToServer(dummyAuth.token).subscribe((x: any) => {
      if (x.connected) {
        expect(x.connected).toBe(true);
        done();
      }
    });
  });

  it("closeConnection should close the connection", async (done: DoneFn) => {
    const service: WebSocketService = TestBed.get(WebSocketService);
    service.connectToServer(dummyAuth.token).subscribe(() => {
      service.closeConnection().subscribe((x: any) => {
        expect(x.connected).toBe(false);
        done();
      });
    });
  });

  it("emitFn should EMIT events", async (done: DoneFn) => {
    const service: WebSocketService = TestBed.get(WebSocketService);

    service.connectToServer(dummyAuth.token).subscribe((x: any) => {
      if (x.connected) {
        service.emit("Channel", {}).subscribe((y: any) => {
          if (y.emitted) {
            expect(y.emitted).toBe(true);
            expect(y.eventName).toBe("Channel");
            done();
          }
        });
      }
    });
  });
});
