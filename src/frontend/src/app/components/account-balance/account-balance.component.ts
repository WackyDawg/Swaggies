import { Component } from '@angular/core';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrl: './account-balance.component.css'
})
export class AccountBalanceComponent {
  isBalanceVisible: boolean = false;

  balance: string = '2,793,443.99';

  toggleBalanceVisibility() {
    this.isBalanceVisible = !this.isBalanceVisible;
  }
  // getBalance() {
  //   return this.isBalanceVisible ? this.balance : '****';
  // }

}
