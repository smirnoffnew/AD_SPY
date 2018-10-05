import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core';
import {FormsModule, FormControl} from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {AppComponent} from './app.component';
import {RestService} from "./rest.service";
import {LoginComponent} from './login/login/login.component';
import {AuthService} from "./auth.service";
import {AuthGuard} from "./auth-guard.service";
import {RegisterComponent} from "./login/register/register.component";
import {VerifyEmailComponent} from "./login/verify-email/verify-email.component";
import {EmailCodeComponent} from "./login/email-code/email-code.component";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {NonAuthGuard} from "./non-auth-guard.service";
import {ServerErrorGuard} from "./server-error-guard.service";
import {SearchesComponent} from "./ads/search/searches.component";
import {EditLabelsComponent} from "./ads/edit-labels/edit-labels.component";
import {AccountModule} from "./account/account.module";
import {AdListComponent} from './ads/ad-list/ad-list.component';
import {FbSharedModule} from "./shared/fb-shared.module";
import {ServerErrorComponent} from './server-error/server-error.component';
import {ForgotPasswordComponent} from './login/forgot-password/forgot-password.component';
import {LoadingAdsComponent} from "./ads/loading-ads/loading-ads.component";
import {SubscriptionGuard} from "./subscription-guard.service";
import {SignalRService} from "./signalR.service";
import {HelpdeskModule} from "./helpdesk/helpdesk.module";
import {PanelComponent} from './ads/panel/panel.component';
import {
  CalendarModule, SliderModule, ChartModule, SharedModule, DataTableModule, GrowlModule,
  DialogModule, TooltipModule, ButtonModule, DropdownModule, OverlayPanelModule, InputTextModule, RadioButtonModule,
  ListboxModule, AutoCompleteModule,GalleriaModule
} from 'primeng/primeng';
import {TrendsChartComponent} from './ads/trends-chart/trends-chart.component';
import {AdsLibService} from "./ads/ads-lib.service";
import {NavFiltersComponent} from './ads/nav-filters/nav-filters.component';
import {AdComponent} from './ads/ad/ad.component';
import {EvenOddPipe} from './ads/even-odd.pipe';
import {AdDetailsComponent} from './ads/ad-details/ad-details.component';
import {HomeComponent} from './home/home.component';
import {PasswordResetComponent} from './login/password-reset/password-reset.component';
import {GrowlService} from "./growl.service";
import {LibService} from "./lib.service";
import {AccountComponent} from "./account/account/account.component";
import { NewLabelComponent } from './ads/new-label/new-label.component';
import { SearchFiltersComponent } from './ads/search-filters/search-filters.component';
import { ReportBugComponent } from './ads/report-bug/report-bug.component';
import {AppTopBarComponent} from "./app-topbar.component";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    AccountModule,
    HelpdeskModule,
    FbSharedModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpModule,
    CalendarModule,
    SliderModule,
    ChartModule,
    DialogModule,
    GrowlModule,
    DataTableModule,
    TooltipModule,
    ButtonModule,
    DropdownModule,
    OverlayPanelModule,
    InputTextModule,
    RadioButtonModule,
    ListboxModule,
    AutoCompleteModule,
    GalleriaModule,
    SharedModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,


    RouterModule.forRoot([
      {path: 'verify-email', component: VerifyEmailComponent},
      {path: 'email-code', component: EmailCodeComponent},
      {path: 'login', component: LoginComponent, canActivate: [NonAuthGuard]},
      {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [NonAuthGuard]},
      {path: 'password-reset/:code/:email', component: PasswordResetComponent, canActivate: [NonAuthGuard]},
      {path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
      {path: 'subscribe', component: RegisterComponent, canActivate: [NonAuthGuard]},
      {path: 'ads', component: AdListComponent, canActivate: [SubscriptionGuard]},
      {path: 'ads/:id', component: AdDetailsComponent, canActivate: [SubscriptionGuard]},
      {path: '', component: HomeComponent},
      {path: 'server-error', component: ServerErrorComponent, canActivate: [ServerErrorGuard]},
      {path: '**', component: PageNotFoundComponent}

    ])
  ],
  declarations: [
    AppComponent,
    AdListComponent,
    //LikesChartComponent,
    SearchesComponent,
    EditLabelsComponent,
    LoadingAdsComponent,
    LoginComponent,
    VerifyEmailComponent,
    EmailCodeComponent,
    RegisterComponent,
    PageNotFoundComponent,
    ServerErrorComponent,
    ForgotPasswordComponent,
    PanelComponent,
    TrendsChartComponent,
    NavFiltersComponent,
    AdComponent,
    EvenOddPipe,
    AdDetailsComponent,
    HomeComponent,
    PasswordResetComponent,
    PasswordResetComponent,
    NewLabelComponent,
    SearchFiltersComponent,
    ReportBugComponent,
    AppTopBarComponent,
  ],

  providers: [SignalRService, GrowlService, RestService, LibService, AuthService, SubscriptionGuard,
    AuthGuard, NonAuthGuard, AdsLibService, ServerErrorGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

}
