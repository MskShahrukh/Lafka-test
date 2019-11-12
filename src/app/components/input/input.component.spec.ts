import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { InputComponent } from "./input.component";
import { WebHttpService } from "../../services/httpService/web-http.service";
import { WebSocketService } from "../../services/socketService/web-socket.service";
import { AppTerminalService } from "../../services/terminalService/app-terminal.service";

describe("InputComponent", () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let de: DebugElement;

  let serviceStub: any;

  beforeEach(async(() => {
    serviceStub = {};

    TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [HttpClientTestingModule],
      providers: [WebHttpService, WebSocketService, AppTerminalService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
