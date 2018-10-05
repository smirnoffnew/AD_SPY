import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
}                           from '@angular/router';
import { AuthService }      from './auth.service';
import {Observable} from "rxjs/Rx";
import {RestService} from "./rest.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(public _authService: AuthService,
              private _router: Router,
              public _restService:RestService
              ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    return this._authService.getIsLoggedIn();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this._authService.getIsLoggedIn() && this._authService.emailConfirmed() ) { return true; }
    if (this._authService.getIsLoggedIn() && !this._authService.emailConfirmed() ) {
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
