import {Injectable}       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
}                           from '@angular/router';
import {AuthService}      from './auth.service';
import {Observable} from "rxjs/Rx";
import {RestService} from "./rest.service";
import {GrowlService} from "./growl.service";

@Injectable()
export class SubscriptionGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private _growlService:GrowlService, public _authService:AuthService, private _router:Router, public _restService:RestService) {
  }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>|boolean {

    var subscriptionValid = this._authService.getSubscriptionValidObservable()
    if (subscriptionValid) {
      return subscriptionValid;
    }
    this._growlService.addMessage("warn", "Please buy more views", '')
    this._router.navigate(['/account/subscription']);
    return false;

  }

  canActivateChild(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>|boolean {
    return this.canActivate(route, state);
  }

  canLoad(route:Route):boolean {
    let url = `/${route.path}`;

    return this.checkLogin(url);
  }

  checkLogin(url:string):boolean {
    alert(1)
    if (this._authService.getIsLoggedIn() && this._authService.emailConfirmed()) {
      return true;
    }
    if (this._authService.getIsLoggedIn() && !this._authService.emailConfirmed()) {
      this._router.navigate(['/verify-email']);
      return false;
    }
    // Store the attempted URL for redirecting
    //this._authService.redirectUrl = url;

    // Create a dummy session id
    //let sessionId = 123456789;

    // Set our navigation extras object
    // that contains our global query params and fragment
    //let navigationExtras: NavigationExtras = {
    //queryParams: { 'session_id': sessionId },
    //fragment: 'anchor'
    //};

    // Navigate to the login page with extras
    this._router.navigate(['/login']);
    return false;
  }
}
