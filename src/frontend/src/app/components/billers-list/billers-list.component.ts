import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billers-list',
  templateUrl: './billers-list.component.html',
  styleUrl: './billers-list.component.css'
})
export class BillersListComponent {
  constructor(private router: Router) { }
  dataProvider: any[] = [
    { name: '9mobile', icon: '/assets/img/brands/9mobile.png' },
    { name: 'Airtel', icon: '/assets/img/brands/airtel.png' },
    { name: 'Glo', icon: '/assets/img/brands/glo.png' },
    { name: 'MTN', icon: '/assets/img/brands/mtn.png' }
  ];

  payTvProvider: any[] = [
    { name: 'Gotv', icon: '/assets/img/brands/gotv.png' },
    { name: 'Dstv', icon: '/assets/img/brands/dstv.png' },
    { name: 'Showmax', icon: '/assets/img/brands/showmax.png' }
  ];

  electricityProvider: any[] = [
    { name: 'Eko Electricity', icon: '/assets/bills.png' },
    { name: 'Ikeja Electricity', icon: '/assets/bills.png' },
    { name: 'Ibadan Electricity', icon: '/assets/bills.png' },
    { name: 'Portharcourt Electricity', icon: '/assets/bills.png' }
  ]

  bettingProvider: any[] = [
    { name: 'SportyBet', icon: '/assets/bills.png' },
    { name: 'Bet9ja', icon: '/assets/bills.png' },
    { name: 'BetKing', icon: '/assets/bills.png' },
    { name: 'NairaBet', icon: '/assets/bills.png' }
  ];

  appsProvider: any[] = [
    { name: 'Piggyvest', icon: '/assets/bills.png' },
    { name: 'Topship Limited', icon: '/assets/bills.png' },
    { name: 'Bamboo', icon: '/assets/bills.png' },
    { name: 'Curacel', icon: '/assets/bills.png' }
  ];

  navigateToMyBills(){
    this.router.navigate(['/my-bills']);
  }
}
