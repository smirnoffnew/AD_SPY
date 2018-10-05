import {Component, OnInit} from '@angular/core';
import {RestService} from "../../rest.service";
import {GrowlService} from "../../growl.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email:string;

  constructor(public _restService:RestService,public _growlService:GrowlService) {
  }

  sendResetLink() {
    this._restService.get("passwordReset", {email: this.email}).subscribe(x=> {
     this. _growlService.addMessage("success","Done","check your email ")
    });
  }

  ngOnInit() {
  }

}
