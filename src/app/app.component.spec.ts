import { TestBed, async } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { AppComponent } from "./app.component";
import { MainComponent } from "./components/main/main.component";
import { TerminalComponent } from "./components/terminal/terminal.component";
import { InputComponent } from "./components/input/input.component";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MainComponent,
        TerminalComponent,
        InputComponent
      ],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  });
});
