import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-bills',
  templateUrl: './my-bills.component.html',
  styleUrl: './my-bills.component.css'
})
export class MyBillsComponent {
  constructor(private router: Router){}
  title: string = 'My Bills'

  navigateBack(){
    this.router.navigate(['/bills-payment']);
  }

}
