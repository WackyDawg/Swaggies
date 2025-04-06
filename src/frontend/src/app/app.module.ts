import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LucideAngularModule, Home, Search, CreditCard, User, Copy } from 'lucide-angular';
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
import { AddCashComponent } from './components/modals/add-cash/add-cash.component';
import { ScanQrComponent } from './components/pages/scan-qr/scan-qr.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrResultComponent } from './components/pages/qr-result/qr-result.component';
import { MessagesComponent } from './components/pages/messages/messages.component';
import { CardsComponent } from './components/pages/cards/cards.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { BillsPaymentComponent } from './components/pages/bills-payment/bills-payment.component';
import { RequestsComponent } from './components/pages/requests/requests.component';
import { GroupsComponent } from './components/pages/groups/groups.component';
import { BillersListComponent } from './components/billers-list/billers-list.component';
import { BillerSearchComponent } from './components/biller-search/biller-search.component';
import { SettingsIcoComponent } from './components/ui/settings-ico/settings-ico.component';
import { MyBillsComponent } from './components/pages/my-bills/my-bills.component';
import { BeneficiaryListComponent } from './components/beneficiary-list/beneficiary-list.component';
import { AddIcoComponent } from './components/ui/add-ico/add-ico.component';
import { EditIcoComponent } from './components/ui/edit-ico/edit-ico.component';
import { DeleteIcoComponent } from './components/ui/delete-ico/delete-ico.component';
import { MessagesTabsComponent } from './components/messages-tabs/messages-tabs.component';
import { MessagesInboxComponent } from './components/messages-inbox/messages-inbox.component';
import { MessagesSentComponent } from './components/messages-sent/messages-sent.component';


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
    AddCashComponent,
    ScanQrComponent,
    QrResultComponent,
    MessagesComponent,
    CardsComponent,
    ProfileComponent,
    BillsPaymentComponent,
    RequestsComponent,
    GroupsComponent,
    BillersListComponent,
    BillerSearchComponent,
    SettingsIcoComponent,
    MyBillsComponent,
    BeneficiaryListComponent,
    AddIcoComponent,
    EditIcoComponent,
    DeleteIcoComponent,
    MessagesTabsComponent,
    MessagesInboxComponent,
    MessagesSentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ZXingScannerModule,
    LucideAngularModule.pick({ Home, Search, CreditCard, User, Copy })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
