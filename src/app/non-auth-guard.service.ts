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
export class NonAuthGuard implements CanActivate{
  constructor(public _authService: AuthService, private _router: Router,public _restService:RestService ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    return !this._authService.getIsLoggedIn();
  }


}
