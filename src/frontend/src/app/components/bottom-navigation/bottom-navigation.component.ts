import { Component } from '@angular/core';
import { Home, Search, CreditCard, User } from 'lucide-angular';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.css']
})
export class BottomNavigationComponent {
  icons = { Home, Search, CreditCard, User };
}
