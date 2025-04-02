import { Component, HostListener } from '@angular/core';
import { ModalService } from '../../../services/search-modal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  lastScrollY = window.scrollY;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.getElementById('sticky-header');
    if (!header) return;

    if (window.scrollY < this.lastScrollY) {
      header.classList.remove('-translate-y-full');
    } else {
      header.classList.add('-translate-y-full');
    }

    this.lastScrollY = window.scrollY;
  }

  activeTab: string = 'tab1';

  onTabChange(tab: string) {
    this.activeTab = tab; 
  }

  constructor(private modalService: ModalService) {}

  openModal() {
    this.modalService.openModal();
  }
}
