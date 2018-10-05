import {Injectable} from '@angular/core';
import {RequestOptions, Http, Request, Response, URLSearchParams, Headers} from '@angular/http';
import {environment} from  '../environments/environment'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {GrowlService} from "./growl.service";
import { ReplaySubject } from 'rxjs/Rx';
declare var $:any;

@Injectable()
export class RestService {
  private _adUrl = environment.apiUrl;
  loading:number = 0;
  public serverError$ = new ReplaySubject(1);

  constructor(private _http:Http, private _router:Router, public _growlService:GrowlService) {
    this.serverError$.next(false);
  }

  private headers():Headers {
    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);
    return headers;
  }

  isLoading() {
    return this.loading > 0;
  }

  refreshLoadingCounter(counterValue){
    this.loading = counterValue ? counterValue : 0;
  }

  delete(endPoint:string, id:string):Observable<any> {
    this.loading++;
    return this._http.delete(this._adUrl + endPoint + "/" + id, {headers: this.headers()})
      ._do(() => {
        this.loading--;
      })
      .map((response:Response) => response["_body"] ? response.json() : null)
      .catch((err)=>this.handleError(err, this))
  }

  get(endPoint:string, params:any = null):Observable<any> {
    this.loading++;
    var qStr = params ? $.param(params) : '';
    return this._http.get(this._adUrl + endPoint + "?" + qStr, {headers: this.headers()})
      ._do(() => {
        this.loading--;
      })
      .map((response:Response) => response["_body"] ? response.json() : null)
      .catch((err)=>this.handleError(err, this))
  }

  getSingle(endPoint:string, params:any):Observable<any> {
    this.loading++;
    var qStr = $.param(params);
    return this._http.get(this._adUrl + endPoint + "?" + qStr, {headers: this.headers()})
      ._do(() => {
        this.loading--;
      })
      .map((response:Response) => response["_body"] ? response.json() : null)
      .catch((err)=>this.handleError(err, this))
  }

  post(endPoint:string, params:any, options:any = null):Observable<any> {
    this.loading++;
    if (!options)
      options = {headers: this.headers()}
    return this._http.post(this._adUrl + endPoint, params, options)
      ._do(() => {
        this.loading--;
      })
      .map((response:Response) => response["_body"] ? response.json() : null)
      .catch((err)=>this.handleError(err, this))
  }

  put(endPoint:string, params:any):Observable<any[]> {
    this.loading++;
    return this._http.put(this._adUrl + endPoint, params, {headers: this.headers()})
      ._do(() => {
        this.loading--;
      })
      .map((response:Response) => response["_body"] ? response.json() : null)
      .catch((err)=>this.handleError(err, this))
  }


  private handleError(err:any, thisService:any):Observable<any> {
    var error = <Response>  err;
    var message;
    var text = error.text()
    if (text) {
      var errorObj = JSON.parse(text);
      message = errorObj.message ? errorObj.message : errorObj.error_description;
    }
    console.log(error.text())
    thisService.loading--;
    if (error.status == 401) {
      localStorage.removeItem('auth_token');
      location.reload();
    }
    if (error.status == 400) {
      this._growlService.addMessage("warn", "Error", message)
    }
    if (error.status == 500) {
      this._growlService.addMessage("warn", "Error", "sorry there was a server error")
      this._router.navigate(['server-error']);
      this.serverError$.next(true);
    }
    return Observable.throw(error);
  }
}

