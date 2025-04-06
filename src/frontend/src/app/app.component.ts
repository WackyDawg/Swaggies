import { Component, OnInit } from '@angular/core';
import { ModalService } from './services/search-modal.service';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'vaultly';
  isTransactionModalOpen = false;
  isDepositModalOpen = false;
  isSettingsModalOpen = false;
  isSearchModalOpen = false;
  hideComponent: boolean = false;

  constructor(private modalService: ModalService, private router: Router) {
    this.modalService.getModalState('searchModal').subscribe((state) => {
      this.isSearchModalOpen = state;
    });

    this.modalService.getModalState('depositModal').subscribe((state) => {
      this.isDepositModalOpen = state;
    });

    this.modalService.getModalState('settingsModal').subscribe((state) => {
      this.isSettingsModalOpen = state;
    });
  }

  closeTransactionModal() {
    this.modalService.closeModal('transactionModal');
  }

  closeDepositModal() {
    this.modalService.closeModal('depositModal');
  }

  closeSettingsModal() {
    this.modalService.closeModal('settingsModal');
  }

  closeSearchModal() {
    this.modalService.closeModal('searchModal');
  }

  

  ngOnInit() {
    this.lockOrientationToPortrait();
    StatusBar.setStyle({ style: Style.Light });
    StatusBar.setBackgroundColor({ color: '#ffffff' });
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;

      if (currentRoute === '/bills-payment' || currentRoute === '/my-bills' || currentRoute === '/messages' || currentRoute === '/settings') {
        this.hideComponent = true;
      } else {
        this.hideComponent = false;
      }
    });
  }

  async lockOrientationToPortrait() {
    await ScreenOrientation.lock({ orientation: 'portrait' });
  }

  async unlockOrientation() {
    await ScreenOrientation.unlock();
  }
}
