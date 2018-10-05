import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AuthService} from "../auth.service";
import {SecurityComponent} from './security/security.component';
import {InfoComponent} from './info/info.component';
import {SubscriptionComponent} from './subscription/subscription.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {FbSharedModule} from "../shared/fb-shared.module";
import {AuthGuard} from "../auth-guard.service";
import {NonAuthGuard} from "../non-auth-guard.service";
import {HistoryComponent} from './history/history.component';
import {
  DataTableModule, DialogModule, SharedModule, ButtonModule, DropdownModule,
  InputTextModule,CheckboxModule
} from "primeng/primeng";
import {AccountService} from "./account.service";
import { AccountComponent } from './account/account.component';
import {FlexLayoutModule} from "@angular/flex-layout";



@NgModule({
  imports: [
    FbSharedModule,
    BrowserModule,
    FormsModule,
    DataTableModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    CheckboxModule,
    SharedModule,
    FlexLayoutModule  ,
    RouterModule.forChild(
      [{path: 'account/info', component: InfoComponent, canActivate: [AuthGuard]},
        {path: 'account/security', component: SecurityComponent, canActivate: [AuthGuard]},
        {path: 'account/subscription', component: SubscriptionComponent, canActivate: [AuthGuard]},
        {path: 'account/history', component: HistoryComponent, canActivate: [AuthGuard]}
      ]
    )],
  declarations: [
    InfoComponent,
    SecurityComponent,
    InfoComponent,
    SubscriptionComponent,
    HistoryComponent,
    AccountComponent,

  ],

  providers: [AuthService, AccountService, AuthGuard, NonAuthGuard],
})

export class AccountModule {

}
