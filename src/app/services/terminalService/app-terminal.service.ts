import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AppTerminalService {
  terminalResponses: String[] = [];

  constructor() {}

  pushToTerminal(data: string) {
    this.terminalResponses.push(data);
  }

  clear() {
    this.terminalResponses = [];
  }
}
