import { Component, OnInit } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Router } from "@angular/router";

@Component({
  selector: 'app-bills-payment',
  templateUrl: './bills-payment.component.html',
  styleUrl: './bills-payment.component.css'
})
export class BillsPaymentComponent implements OnInit {
  constructor(private router: Router){}
  activeTab: string = 'tab1';

  onTabChange(tab: string) {
    this.activeTab = tab; 
  }
  
  ngOnInit(): void {
    StatusBar.setStyle({ style: Style.Light });
  }

  navigateBack(){
    this.router.navigate(['/'])
  }
  
}
