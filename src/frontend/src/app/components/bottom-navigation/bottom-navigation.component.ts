import { Component } from '@angular/core';
import { Home, Search, CreditCard, User } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.css']
})
export class BottomNavigationComponent {
  icons = { Home, Search, CreditCard, User };
  constructor(private router: Router) {}


  navigateToHome() {
    this.router.navigate(['/'])
  }

  navigateToSearch() {
    this.router.navigate(['/search'])
  }

  navigateToPayments() {
    this.router.navigate(['/cards'])
  }

  navigateToProfile() {
    this.router.navigate(['/profile'])
  }

}
