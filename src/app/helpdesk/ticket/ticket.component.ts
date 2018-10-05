import {Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from "../../rest.service";
import {Router, ActivatedRoute} from "@angular/router";
import {GrowlService} from "../../growl.service";
import {LibService} from "../../lib.service";
import {ConfirmationService} from 'primeng/primeng';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  providers: [ConfirmationService]
})
export class TicketComponent implements OnInit {

  ticket:any={};
  id:any;
  model:any = {};

  constructor(public _growlService:GrowlService,
              public _restService:RestService,
              private _libService:LibService,
              private _router:Router,
              private _route:ActivatedRoute,
              private confirmationService: ConfirmationService) {

  }

  confirmCloseTicket() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to close this ticket?',
      accept: () => {
        this.closeTicket();
      }
    });
  }

  getTicket() {
    this._restService.get("ticket", {id: this.id}).subscribe((t)=> {
      this.ticket = t;
    });
  }

  closeTicket() {
    this._restService.delete("ticket", this.id).subscribe(()=> {
    });
    this. _growlService.addMessage("success","Done","Ticket closed")

    this._router.navigate(['/helpdesk']);
  }

  createMessage() {
    this.model.id = this.id;
    this._restService.put("ticket", this.model).subscribe(()=> {
      this.model = {}
      this.getTicket();
      this. _growlService.addMessage("success","Done","Message submitted")

      //this.alerts.success("Message submitted");
      //this.alerts.success('Ticket submited');
      //setTimeout(()=>{this._router.navigate(['/helpdesk']);},1000);

    });
  }

//this._router.navigate(['/helpdesk']);
  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this.getTicket();
  }

}
