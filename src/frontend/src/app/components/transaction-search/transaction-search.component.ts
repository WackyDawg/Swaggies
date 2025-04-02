import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transaction-search',
  templateUrl: './transaction-search.component.html',
  styleUrl: './transaction-search.component.css'
})
export class TransactionSearchComponent {

  @Output() openRequest = new EventEmitter<void>();

  open() {
    console.log('Transaction Search Clicked - Emitting openRequest');
    this.openRequest.emit();
  }
}
