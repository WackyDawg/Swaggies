import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LucideAngularModule, Home, Search, CreditCard, User } from 'lucide-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';
import { QuickAccessComponent } from './components/quick-access/quick-access.component';
import { TransactionTabsComponent } from './components/transaction-tabs/transaction-tabs.component';
import { AccountBalanceComponent } from './components/account-balance/account-balance.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { TransactionSearchComponent } from './components/transaction-search/transaction-search.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { SEARCHComponent } from './components/modals/search/search.component';
import { BottomNavigationComponent } from './components/bottom-navigation/bottom-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ActionButtonsComponent,
    QuickAccessComponent,
    TransactionTabsComponent,
    AccountBalanceComponent,
    AccountInfoComponent,
    TransactionSearchComponent,
    TransactionListComponent,
    SEARCHComponent,
    BottomNavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LucideAngularModule.pick({ Home, Search, CreditCard, User })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
