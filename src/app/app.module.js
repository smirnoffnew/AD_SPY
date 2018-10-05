"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var flex_layout_1 = require("@angular/flex-layout");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var app_component_1 = require('./app.component');
var rest_service_1 = require("./rest.service");
var login_component_1 = require('./login/login/login.component');
var auth_service_1 = require("./auth.service");
var auth_guard_service_1 = require("./auth-guard.service");
var register_component_1 = require("./login/register/register.component");
var verify_email_component_1 = require("./login/verify-email/verify-email.component");
var email_code_component_1 = require("./login/email-code/email-code.component");
var page_not_found_component_1 = require('./page-not-found/page-not-found.component');
var non_auth_guard_service_1 = require("./non-auth-guard.service");
var server_error_guard_service_1 = require("./server-error-guard.service");
var searches_component_1 = require("./ads/search/searches.component");
var edit_labels_component_1 = require("./ads/edit-labels/edit-labels.component");
var account_module_1 = require("./account/account.module");
var ad_list_component_1 = require('./ads/ad-list/ad-list.component');
var fb_shared_module_1 = require("./shared/fb-shared.module");
var server_error_component_1 = require('./server-error/server-error.component');
var forgot_password_component_1 = require('./login/forgot-password/forgot-password.component');
var loading_ads_component_1 = require("./ads/loading-ads/loading-ads.component");
var subscription_guard_service_1 = require("./subscription-guard.service");
var signalR_service_1 = require("./signalR.service");
var helpdesk_module_1 = require("./helpdesk/helpdesk.module");
var panel_component_1 = require('./ads/panel/panel.component');
var primeng_1 = require('primeng/primeng');
var trends_chart_component_1 = require('./ads/trends-chart/trends-chart.component');
var ads_lib_service_1 = require("./ads/ads-lib.service");
var nav_filters_component_1 = require('./ads/nav-filters/nav-filters.component');
var ad_component_1 = require('./ads/ad/ad.component');
var even_odd_pipe_1 = require('./ads/even-odd.pipe');
var ad_details_component_1 = require('./ads/ad-details/ad-details.component');
var home_component_1 = require('./home/home.component');
var password_reset_component_1 = require('./login/password-reset/password-reset.component');
var growl_service_1 = require("./growl.service");
var lib_service_1 = require("./lib.service");
var account_component_1 = require("./account/account/account.component");
var new_label_component_1 = require('./ads/new-label/new-label.component');
var search_filters_component_1 = require('./ads/search-filters/search-filters.component');
var report_bug_component_1 = require('./ads/report-bug/report-bug.component');
var app_topbar_component_1 = require("./app-topbar.component");
var ngx_infinite_scroll_1 = require('ngx-infinite-scroll');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                account_module_1.AccountModule,
                helpdesk_module_1.HelpdeskModule,
                fb_shared_module_1.FbSharedModule,
                platform_browser_1.BrowserModule,
                flex_layout_1.FlexLayoutModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                primeng_1.CalendarModule,
                primeng_1.SliderModule,
                primeng_1.ChartModule,
                primeng_1.DialogModule,
                primeng_1.GrowlModule,
                primeng_1.DataTableModule,
                primeng_1.TooltipModule,
                primeng_1.ButtonModule,
                primeng_1.DropdownModule,
                primeng_1.OverlayPanelModule,
                primeng_1.InputTextModule,
                primeng_1.RadioButtonModule,
                primeng_1.ListboxModule,
                primeng_1.AutoCompleteModule,
                primeng_1.GalleriaModule,
                primeng_1.SharedModule,
                animations_1.BrowserAnimationsModule,
                ngx_infinite_scroll_1.InfiniteScrollModule,
                router_1.RouterModule.forRoot([
                    { path: 'verify-email', component: verify_email_component_1.VerifyEmailComponent },
                    { path: 'email-code', component: email_code_component_1.EmailCodeComponent },
                    { path: 'login', component: login_component_1.LoginComponent, canActivate: [non_auth_guard_service_1.NonAuthGuard] },
                    { path: 'forgot-password', component: forgot_password_component_1.ForgotPasswordComponent, canActivate: [non_auth_guard_service_1.NonAuthGuard] },
                    { path: 'password-reset/:code/:email', component: password_reset_component_1.PasswordResetComponent, canActivate: [non_auth_guard_service_1.NonAuthGuard] },
                    { path: 'account', component: account_component_1.AccountComponent, canActivate: [auth_guard_service_1.AuthGuard] },
                    { path: 'subscribe', component: register_component_1.RegisterComponent, canActivate: [non_auth_guard_service_1.NonAuthGuard] },
                    { path: 'ads', component: ad_list_component_1.AdListComponent, canActivate: [subscription_guard_service_1.SubscriptionGuard] },
                    { path: 'ads/:id', component: ad_details_component_1.AdDetailsComponent, canActivate: [subscription_guard_service_1.SubscriptionGuard] },
                    { path: '', component: home_component_1.HomeComponent },
                    { path: 'server-error', component: server_error_component_1.ServerErrorComponent, canActivate: [server_error_guard_service_1.ServerErrorGuard] },
                    { path: '**', component: page_not_found_component_1.PageNotFoundComponent }
                ])
            ],
            declarations: [
                app_component_1.AppComponent,
                ad_list_component_1.AdListComponent,
                //LikesChartComponent,
                searches_component_1.SearchesComponent,
                edit_labels_component_1.EditLabelsComponent,
                loading_ads_component_1.LoadingAdsComponent,
                login_component_1.LoginComponent,
                verify_email_component_1.VerifyEmailComponent,
                email_code_component_1.EmailCodeComponent,
                register_component_1.RegisterComponent,
                page_not_found_component_1.PageNotFoundComponent,
                server_error_component_1.ServerErrorComponent,
                forgot_password_component_1.ForgotPasswordComponent,
                panel_component_1.PanelComponent,
                trends_chart_component_1.TrendsChartComponent,
                nav_filters_component_1.NavFiltersComponent,
                ad_component_1.AdComponent,
                even_odd_pipe_1.EvenOddPipe,
                ad_details_component_1.AdDetailsComponent,
                home_component_1.HomeComponent,
                password_reset_component_1.PasswordResetComponent,
                password_reset_component_1.PasswordResetComponent,
                new_label_component_1.NewLabelComponent,
                search_filters_component_1.SearchFiltersComponent,
                report_bug_component_1.ReportBugComponent,
                app_topbar_component_1.AppTopBarComponent,
            ],
            providers: [signalR_service_1.SignalRService, growl_service_1.GrowlService, rest_service_1.RestService, lib_service_1.LibService, auth_service_1.AuthService, subscription_guard_service_1.SubscriptionGuard,
                auth_guard_service_1.AuthGuard, non_auth_guard_service_1.NonAuthGuard, ads_lib_service_1.AdsLibService, server_error_guard_service_1.ServerErrorGuard],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map