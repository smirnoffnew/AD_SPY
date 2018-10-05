import {Injectable, OnInit} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {Http, Headers, Response, RequestOptions, URLSearchParams} from '@angular/http';
import {Router} from "@angular/router";
import {RestService} from "./rest.service";
import {environment} from "../environments/environment";
import {LibService} from "./lib.service";


declare var $:any;

@Injectable()
export class AuthService {
  //private _user = {_isLoggedIn:false,_emailConfirmed:false,};
  //isLoggedIn = false;
  private _user;
  private _isLoggedIn = false;
  private _emailConfirmed = false;
  private _subscriptionValid = false;
  private _userName;
  user:any;
  redirectUrl:string;
  errorMessage:string;

  // store the URL so we can redirect after logging in


  constructor(private _router:Router, public _restService:RestService, public _libService:LibService    ) {
    this._isLoggedIn = !!localStorage.getItem('auth_token');
  }

  getIsLoggedIn() {
    return this._isLoggedIn;
  }

  setIsLoggedIn(val:boolean) {
    this._isLoggedIn = val;
  }

  login(loginModel) {
    var loginData = {
      grant_type: 'password',
      userName: loginModel.userName,
      password: loginModel.password
    };
    let body = new URLSearchParams();
    body.set('username', loginModel.userName);
    body.set('password', loginModel.password);
    body.set('grant_type', 'password');
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers: headers});
    return this._restService.post("token", body, options);
  }

  getUser() {
    return this._user;
  }

  loading:boolean;

  isLoadingUser() {
    return this.loading;
  }

  //we are handling errors here because there is a custom spinner
  downloadUser() {
    if (!!localStorage.getItem('auth_token')) {
      this.loading = true;
      this._restService.get("user", {}).subscribe((user:any)=> {
          this.loading = false;
          this._user = user;
          this.user = user;
          if (user && !user.emailConfirmed) {
            this._router.navigate(['/verify-email']);
          }
          else if (user && !user.subscriptionValid) {
            this._router.navigate(['/account/subscription']);
          }
        },
        err=> {
          this.loading = false;
        }
      );
    }
  }

  emailConfirmed() {
    return this._emailConfirmed;
  }


  getSubscriptionValid() {
    if (this._user != null) {
      return this._user.viewsLeft > 0;
    }
  }

  getSubscriptionValidObservable() {
    if (this._user != null) {
      return this._user.viewsLeft > 0;
    }
    else {
      this.downloadUser();
      return this._restService.getSingle("SubscriptionValid", {}).first();
    }
  }


  getUserName() {
    return this._userName;
  }

  removeStripeCustomerName() {
    this._user.stripeCustomerId = null;
  }

  setEmailConfirmed() {
    this._emailConfirmed = true;
  }

  setSubscriptionValid(value) {
    this._user.subscriptionValid = value;
  }
  public setUserCookie(data) {
    localStorage.setItem("auth_token", data.access_token);
    this.setIsLoggedIn(true);
    var d = new Date();
    d.setTime(d.getTime() + (1000 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = `login=true;${expires};path=/;domain=.${environment.bareUrl}`;
  }


  logout() {
    localStorage.removeItem('auth_token');
    this._isLoggedIn = false;
    var d = new Date();
    document.cookie = `login=false;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${environment.bareUrl}`;
  }

  // hasViews():Observable<boolean>|boolean {
  //
  //   var subscriptionValid = this._authService.getSubscriptionValidObservable()
  //   if (subscriptionValid) {
  //     return subscriptionValid;
  //   }
  //
  // }

}
