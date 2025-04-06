import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  constructor(private router: Router){}
  title: string = 'Messages/Requests'
  activeTab: string = 'tab1';

  GroupedMessages = [
    {
      date: '02-04-2025',
      messages: [
        {
          id: 1,
          service: 'Showmax',
          heading: 'Purchase Successful 🎉',
          message: 'Your subscription of ₦2500 to Showmax package was successful',
        },
        {
          id: 2,
          service: 'Mtn',
          heading: 'Purchase Successful 🎉',
          message: 'Your subscription of ₦250 Airtime was successful',
        },
      ]
    },
    {
      date: '01-04-2025',
      messages: [
        {
          id: 3,
          service: 'Netflix',
          heading: 'Purchase Successful 🎉',
          message: 'Let\'s catch up!',
        }
      ]
    }
  ];
  

  onTabChange(tab: string) {
    this.activeTab = tab; 
  }

  navigateBack() {
    this.router.navigate(['/'])
  }
}
