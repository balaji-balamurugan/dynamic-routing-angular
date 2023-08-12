import { NgModule, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { TradeComponent } from './components/trade/trade.component';

export type MenuType = {
  burgerMenu: {
    menuPath: string;
    urlType: string;
    menuName: string;
    id: string;
    externalUrlTarget: '_blank';
  }[];
};

export const componentMap: { [K: string]: Type<any> } = {
  dashboard: DashboardComponent,
  payments: PaymentsComponent,
  accounts: AccountsComponent,
  trade: TradeComponent,
};

const standardRoutes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(standardRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
