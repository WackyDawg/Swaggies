import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { ScanQrComponent } from './components/pages/scan-qr/scan-qr.component';
import { QrResultComponent } from './components/pages/qr-result/qr-result.component';
import { CardsComponent } from './components/pages/cards/cards.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { BillsPaymentComponent } from './components/pages/bills-payment/bills-payment.component';
import { RequestsComponent } from './components/pages/requests/requests.component';
import { GroupsComponent } from './components/pages/groups/groups.component';
import { MyBillsComponent } from './components/pages/my-bills/my-bills.component';
import { MessagesComponent } from './components/pages/messages/messages.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'qr-scan', component: ScanQrComponent },
  { path: 'messages',component: MessagesComponent },
  { path: 'qr-result', component: QrResultComponent },
  { path: 'cards', component: CardsComponent }, 
  { path: 'profile', component: ProfileComponent },
  { path: 'bills-payment', component: BillsPaymentComponent },
  { path: 'requests-payment', component: RequestsComponent },
  { path: 'groups', component: GroupsComponent }, 
  { path: 'my-bills', component: MyBillsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
