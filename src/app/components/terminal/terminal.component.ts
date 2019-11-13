import { Component, OnInit } from "@angular/core";

import { AppTerminalService } from "../../services/terminalService/app-terminal.service";

@Component({
  selector: "app-terminal",
  templateUrl: "./terminal.component.html",
  styleUrls: ["./terminal.component.css"]
})
export class TerminalComponent implements OnInit {
  constructor(private terminal: AppTerminalService) {}

  terminalResponses: String[] = this.terminal.terminalResponses;

  ngOnInit() {}
}
