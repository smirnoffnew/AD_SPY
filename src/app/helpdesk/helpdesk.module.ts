import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AuthService} from "../auth.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {FbSharedModule} from "../shared/fb-shared.module";
import {AuthGuard} from "../auth-guard.service";
import {NonAuthGuard} from "../non-auth-guard.service";
import {TicketsComponent} from './tickets/tickets.component';
import {TicketComponent} from './ticket/ticket.component';
import {NewTicketComponent} from './new-ticket/new-ticket.component';
import {
  DataTableModule,
  SharedModule,
  TooltipModule,
  ButtonModule,
  InputTextModule,
  InputTextareaModule,
  ConfirmDialogModule
} from "primeng/primeng";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    FbSharedModule,
    BrowserModule,
    FormsModule,
    //Ng2Bs3ModalModule,

    DataTableModule,
    TooltipModule,
    SharedModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    ConfirmDialogModule,
    FlexLayoutModule,

    RouterModule.forChild(
      [{path: 'helpdesk', component: TicketsComponent, canActivate: [AuthGuard]},
        {path: 'helpdesk/create', component: NewTicketComponent, canActivate: [AuthGuard]},
        {path: 'helpdesk/:id', component: TicketComponent, canActivate: [AuthGuard]},
      ]
    )],
  declarations: [
    TicketsComponent,
    TicketComponent,
    NewTicketComponent,
  ],

  providers: [AuthService, AuthGuard, NonAuthGuard],
})

export class HelpdeskModule {

}
