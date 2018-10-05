import {Injectable} from '@angular/core';
import {RestService} from "../rest.service";

@Injectable()
export class AccountService {
  private _config:any;

  getConfig() {
    return this._config;
  }

  downloadConfig() {
    this._restService.get("config").subscribe((config)=> {
      this._config = config;
    });
  }

  constructor(public _restService:RestService) {
    this.downloadConfig()
  }

}
