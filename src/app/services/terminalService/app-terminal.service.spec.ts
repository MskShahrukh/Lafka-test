import { TestBed } from "@angular/core/testing";

import { AppTerminalService } from "./app-terminal.service";

describe("AppTerminalService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should create", () => {
    const service: AppTerminalService = TestBed.get(AppTerminalService);
    expect(service).toBeTruthy();
  });
});
