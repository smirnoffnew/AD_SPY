import {Component}   from '@angular/core';
import {Router}      from '@angular/router';
import {AuthService} from '../../auth.service';
import {RestService} from "../../rest.service";
import {Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {environment} from "../../../environments/environment";
import {LibService} from "../../lib.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  //message:string;
  model:any = {}
  errorMessage:string;

  constructor(private _router:Router, private _libService:LibService, public _restService:RestService, public _authService:AuthService) {
    _authService.errorMessage = "";
  }

  loading = false;



  login() {
    this.loading = true;
    this._authService.login(this.model)
    //.map((response:Response) =>        response.json()      )
      .catch((err)=>this.handleError(err))
      .subscribe((data:any)=> {
        this.loading = false;
        //todo: need to set app user fully

        this._authService.setUserCookie(data)

        let emailConfirmed = data.emailConfirmed.toLowerCase() === 'true';
        let subscriptionValid = data.subscriptionValid.toLowerCase() === 'true';
        if (!emailConfirmed) {
          this._router.navigate(['verify-email']);
        }
        if (subscriptionValid) {
          this._router.navigate(['ads']);
        }
        if (!subscriptionValid) {
          this._router.navigate(['account/subscription']);
        }

      });
  }

  handleError(er):Observable<any> {
    this.loading = false;
    if (er._body.indexOf("incorrect") >= 0) {
      this.errorMessage = "Wrong password or login"
    }
    return Observable.throw(er.json().error || 'Server error');
  }
}
