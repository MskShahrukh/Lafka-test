import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";

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
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      // this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
