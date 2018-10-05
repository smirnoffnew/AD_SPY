import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";
import {RestService} from "../../rest.service";
import {Router} from "@angular/router";
import {DataTableModule, SharedModule, TooltipModule} from 'primeng/primeng';
//import * as moment from 'moment';
//import _date = moment.unitOfTime._date;
import {LibService} from "../../lib.service";


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  tickets;

  constructor(public _authService:AuthService, public  _restService:RestService, private _libService:LibService, private _router:Router) {

  }

  getTickets() {
    this._restService.get("ticket", {}).subscribe((tickets)=> {
      this.tickets = tickets;
    });
  }



  ngOnInit() {
    this.getTickets();
  }


}
