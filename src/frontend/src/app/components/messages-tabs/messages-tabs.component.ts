import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-messages-tabs',
  templateUrl: './messages-tabs.component.html',
  styleUrl: './messages-tabs.component.css',
})
export class MessagesTabsComponent {
  @Input() activeTab: string = 'tab1';
  @Output() tabChanged = new EventEmitter<string>();

  setActiveTab(tab: string) {
    this.tabChanged.emit(tab);
  }
}
