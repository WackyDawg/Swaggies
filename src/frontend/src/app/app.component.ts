import { Component, OnInit } from '@angular/core';
import { ModalService } from './services/search-modal.service';
import { ScreenOrientation } from '@capacitor/screen-orientation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'vaultly';
  isModalOpen = false;

  constructor(private modalService: ModalService) {
    this.modalService.isModalOpen$.subscribe((state) => {
      console.log('AppComponent: isModalOpen updated:', state);
      this.isModalOpen = state;
    });
  }

  openModal() {
    this.modalService.openModal();
  }

  closeModal() {
    this.modalService.closeModal();
  }

  ngOnInit() {
    this.lockOrientationToPortrait();
  }

  async lockOrientationToPortrait() {
    await ScreenOrientation.lock({ orientation: 'portrait' });
  }

  async unlockOrientation() {
    await ScreenOrientation.unlock();
  }
}
