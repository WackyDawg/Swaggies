import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-access',
  templateUrl: './quick-access.component.html',
  styleUrl: './quick-access.component.css'
})
export class QuickAccessComponent {
  constructor(public router: Router) {}
  
  navigateToBills(){
    this.router.navigate(['/bills-payment'])
  }

  navigateToRequests(){
    this.router.navigate(['/requests-payment'])
  }

  navigateToGroups(){
    this.router.navigate(['/groups'])
  }

}
