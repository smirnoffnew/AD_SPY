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
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var fb_shared_module_1 = require("../shared/fb-shared.module");
var auth_guard_service_1 = require("../auth-guard.service");
var non_auth_guard_service_1 = require("../non-auth-guard.service");
var tickets_component_1 = require('./tickets/tickets.component');
var ticket_component_1 = require('./ticket/ticket.component');
var new_ticket_component_1 = require('./new-ticket/new-ticket.component');
var primeng_1 = require("primeng/primeng");
var flex_layout_1 = require("@angular/flex-layout");
var HelpdeskModule = (function () {
    function HelpdeskModule() {
    }
    HelpdeskModule = __decorate([
        core_1.NgModule({
            imports: [
                fb_shared_module_1.FbSharedModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                //Ng2Bs3ModalModule,
                primeng_1.DataTableModule,
                primeng_1.TooltipModule,
                primeng_1.SharedModule,
                primeng_1.ButtonModule,
                primeng_1.InputTextModule,
                primeng_1.InputTextareaModule,
                primeng_1.ConfirmDialogModule,
                flex_layout_1.FlexLayoutModule,
                router_1.RouterModule.forChild([{ path: 'helpdesk', component: tickets_component_1.TicketsComponent, canActivate: [auth_guard_service_1.AuthGuard] },
                    { path: 'helpdesk/create', component: new_ticket_component_1.NewTicketComponent, canActivate: [auth_guard_service_1.AuthGuard] },
                    { path: 'helpdesk/:id', component: ticket_component_1.TicketComponent, canActivate: [auth_guard_service_1.AuthGuard] },
                ])],
            declarations: [
                tickets_component_1.TicketsComponent,
                ticket_component_1.TicketComponent,
                new_ticket_component_1.NewTicketComponent,
            ],
            providers: [auth_service_1.AuthService, auth_guard_service_1.AuthGuard, non_auth_guard_service_1.NonAuthGuard]
        })
    ], HelpdeskModule);
    return HelpdeskModule;
}());
exports.HelpdeskModule = HelpdeskModule;
//# sourceMappingURL=helpdesk.module.js.map