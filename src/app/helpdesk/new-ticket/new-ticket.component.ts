import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RestService} from "../../rest.service";
//import {AuthService} from "../../auth.service";
//import {AlertComponent} from "../../alert/alert.component";
import {GrowlService} from "../../growl.service";
@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit {
  model:any = {};


  constructor(public _growlService:GrowlService, public _restService:RestService, private _router:Router) {

  }

  createTicket() {

    this._restService.post("ticket", this.model).subscribe(()=> {
      //this.alerts.success('Ticket submited');
      //setTimeout(()=>{this._router.navigate(['/helpdesk']);},1000);
      this. _growlService.addMessage("success","Done","Ticket created, we will get back ASAP")

      this._router.navigate(['/helpdesk']);
    });
  }

  ngOnInit() {
  }

}
