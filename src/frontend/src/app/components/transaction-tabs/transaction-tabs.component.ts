import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transaction-tabs',
  templateUrl: './transaction-tabs.component.html',
  styleUrl: './transaction-tabs.component.css'
})
export class TransactionTabsComponent {
  @Input() activeTab: string = 'tab1';
  @Output() tabChanged = new EventEmitter<string>();

  setActiveTab(tab: string) {
    this.tabChanged.emit(tab);
  }
}
