import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";
import {RestService} from "../../rest.service";
import {GrowlService} from "../../growl.service";


@Component({
  selector: 'fb-info',
  templateUrl: './info.component.html',
  styleUrls: ['../account.scss']
})


export class InfoComponent implements OnInit {

  model:any = {};
  allowed:boolean;
  showChangeEmailForm:boolean;
  showEnterCodeForm:boolean;
  newEmailAlreadyTaken:boolean;
  invalidVerificationCode:boolean;

  constructor(public _authService:AuthService, public _restService:RestService, public _growlService:GrowlService) {
    this.newEmailAlreadyTaken = false;
    this.invalidVerificationCode = false;
    this.allowed = true;
  }

  private checkUserName(e) {
    this._restService.get("register", {id: e}).subscribe((allowed)=> {
      this.allowed = allowed;
      this.newEmailAlreadyTaken = !allowed;
    });
  }

  private getCode() {
    this.showEnterCodeForm = true;
    //this.alerts.success('Check your email');
    this._growlService.addMessage("success", "Check your email", "");
    this._restService.post("changeEmail", {newEmail: this.model.newEmail}).subscribe((x)=> {

    })
  }

  confirmCode() {
    this._restService.put("changeEmail", {newEmail: this.model.newEmail, code: this.model.code}).subscribe((x)=> {
      console.log("x", x);
      console.log('response from changeEmail');
      this.showChangeEmailForm = false;
      this.showEnterCodeForm = false;
      this.model = {};
      this._authService.downloadUser();
      this._growlService.addMessage("success", "new email confirmed", "")

    }, (er)=> {
      if (er.status = 400) {
        this._growlService.addMessage("warning", "Wrong code", "");
        this.invalidVerificationCode = true;
      }
    })
  }

  ngOnInit() {
  }

}
