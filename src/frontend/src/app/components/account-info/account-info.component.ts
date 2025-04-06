import { Component } from '@angular/core';
import { ModalService } from '../../services/search-modal.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css'
})
export class AccountInfoComponent {
constructor(private modalService: ModalService) { }

  openDepositAction(){
    this.modalService.openModal('depositModal');
  }
}
