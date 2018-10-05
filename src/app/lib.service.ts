import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {RestService} from "./rest.service";
import {environment} from "../environments/environment";

@Injectable()
export class LibService {

  constructor(_restService:RestService) {
  }

  public  fromNow(date) {
    var local = this.local(date)
    return moment(local).fromNow()
  }

  local(date) {
    var stillUtc = moment.utc(date).toDate()
    var local = moment(stillUtc).local()
    return local
  }


}
