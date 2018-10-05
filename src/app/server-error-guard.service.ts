import { Injectable }       from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from "rxjs/Rx";
import {RestService} from "./rest.service";

@Injectable()
export class ServerErrorGuard implements CanActivate {
    constructor( public _restService:RestService ) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
        return this._restService.serverError$;
    }
}