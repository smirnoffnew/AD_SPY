"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_service_1 = require("../auth.service");
var security_component_1 = require('./security/security.component');
var info_component_1 = require('./info/info.component');
var subscription_component_1 = require('./subscription/subscription.component');
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var fb_shared_module_1 = require("../shared/fb-shared.module");
var auth_guard_service_1 = require("../auth-guard.service");
var non_auth_guard_service_1 = require("../non-auth-guard.service");
var history_component_1 = require('./history/history.component');
var primeng_1 = require("primeng/primeng");
var account_service_1 = require("./account.service");
var account_component_1 = require('./account/account.component');
var flex_layout_1 = require("@angular/flex-layout");
var AccountModule = (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        core_1.NgModule({
            imports: [
                fb_shared_module_1.FbSharedModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                primeng_1.DataTableModule,
                primeng_1.DialogModule,
                primeng_1.ButtonModule,
                primeng_1.DropdownModule,
                primeng_1.InputTextModule,
                primeng_1.CheckboxModule,
                primeng_1.SharedModule,
                flex_layout_1.FlexLayoutModule,
                router_1.RouterModule.forChild([{ path: 'account/info', component: info_component_1.InfoComponent, canActivate: [auth_guard_service_1.AuthGuard] },
                    { path: 'account/security', component: security_component_1.SecurityComponent, canActivate: [auth_guard_service_1.AuthGuard] },
                    { path: 'account/subscription', component: subscription_component_1.SubscriptionComponent, canActivate: [auth_guard_service_1.AuthGuard] },
                    { path: 'account/history', component: history_component_1.HistoryComponent, canActivate: [auth_guard_service_1.AuthGuard] }
                ])],
            declarations: [
                info_component_1.InfoComponent,
                security_component_1.SecurityComponent,
                info_component_1.InfoComponent,
                subscription_component_1.SubscriptionComponent,
                history_component_1.HistoryComponent,
                account_component_1.AccountComponent,
            ],
            providers: [auth_service_1.AuthService, account_service_1.AccountService, auth_guard_service_1.AuthGuard, non_auth_guard_service_1.NonAuthGuard]
        })
    ], AccountModule);
    return AccountModule;
}());
exports.AccountModule = AccountModule;
//# sourceMappingURL=account.module.js.map