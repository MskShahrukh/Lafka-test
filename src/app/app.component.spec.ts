import { TestBed, async } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { AppComponent } from "./app.component";
import { InputComponent, TerminalComponent } from "./components/index";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, TerminalComponent, InputComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  });
});
