import { Component, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../services/search-modal.service';

@Component({
  selector: 'app-transaction-search',
  templateUrl: './transaction-search.component.html',
  styleUrl: './transaction-search.component.css'
})
export class TransactionSearchComponent {
  constructor(private modalService: ModalService) {}

  openSearchModal(){
    this.modalService.openModal('searchModal');
  }
}
