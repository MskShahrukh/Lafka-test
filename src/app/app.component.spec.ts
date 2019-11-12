import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
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
      // schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  });

  // it(`should have as title 'test'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual("test");
  // });

  // it("should render title", () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector(".content span").textContent).toContain(
  //     "test app is running!"
  //   );
  // });
});
