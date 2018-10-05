import {Injectable} from '@angular/core';
import {Message} from 'primeng/primeng';

@Injectable()
export class GrowlService {
  public messages:Message[] = [];

  public addMessage(type, summary, detail) {
    //check if the same message was added already
    var exists = this.messages.find(x=>x.severity == type && x.summary == summary && x.detail == detail);
    if (exists == null)
      this.messages.push({severity: type, summary: summary, detail: detail});
  }

  constructor() {
  }


}
