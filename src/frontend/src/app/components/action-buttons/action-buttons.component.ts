import { Component } from '@angular/core';
import { ModalService } from '../../services/search-modal.service'; 

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.css'
})
export class ActionButtonsComponent {
  constructor(private modalService: ModalService) { }

  openDepositAction(){
    this.modalService.openModal('depositModal');
  }
}
