import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RestService} from "../../rest.service";
import {GrowlService} from "../../growl.service";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  code:string
  model:any = {}

  constructor(public _restService:RestService, private _router:Router, private _route:ActivatedRoute, public _growlService:GrowlService) {
  }

  resetPassword() {
    this._restService.post("passwordReset", this.model).subscribe(x=> {
      this._growlService.addMessage("success", "Done", "Please login")

      this._router.navigate(['login']);

    },e=>{
      if(e.status == 400)
        this._router.navigate(['forgot-password']);
    });
  }

  ngOnInit() {
    
    this.model.code = this._route.snapshot.params['code'];
    this.model.email = this._route.snapshot.params['email'];

  }

}
