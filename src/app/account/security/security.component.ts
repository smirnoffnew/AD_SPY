//import {AlertModule} from 'ng2-bootstrap/ng2-bootstrap';
import {RestService} from "../../rest.service";
import {FormsModule} from '@angular/forms';
import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
//import 'rxjs/add/operator/map';
//import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
//import {AlertComponent} from "../../alert/alert.component";
import {GrowlService} from "../../growl.service";


declare var $:any;

@Component({
  selector: 'fb-security',
  templateUrl: './security.component.html',
  styleUrls: ['../account.scss']
})
export class SecurityComponent implements OnInit {
  changingPassword:boolean;
  //public alerts:Array<Object> = [];

  constructor(public _restService:RestService,public _growlService:GrowlService ) {
  }

  model = {};

  changePassword() {
    this._restService.post("changePassword", this.model).subscribe(r=> {
      this. _growlService.addMessage("success","Password saved!","")
      this.model = {};
      this.changingPassword = false;
    });
  }

  ngOnInit() {

  }

}
