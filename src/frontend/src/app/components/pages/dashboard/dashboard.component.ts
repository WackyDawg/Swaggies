import { Component, HostListener, OnInit } from '@angular/core';
import { ModalService } from '../../../services/search-modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private modalService: ModalService) {}

  colors: string[] = ['#bd0e0e', '#532cad', '#7436f5'];
  selectedColor: string = '';
  lastScrollY = window.scrollY;


  ngOnInit(): void {
    this.selectedColor = this.colors[Math.floor(Math.random() * this.colors.length)];
  }

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

  navigateToScanQr() {
    this.router.navigate(['/qr-scan']);
  }

  navigateToMessages() {
    this.router.navigate(['/messages'])
  }
  
}
