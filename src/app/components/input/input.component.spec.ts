import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { InputComponent } from "./input.component";
import {
  WebHttpService,
  WebSocketService,
  AppTerminalService
} from "../../services/index";

describe("InputComponent", () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {
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
