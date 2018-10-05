import {Injectable} from "@angular/core";
import {environment} from  '../environments/environment'

@Injectable()
export class SignalRService {
  connection:any;
  chat:any;

  constructor() {
    //this._isLoggedIn = !!localStorage.getItem('auth_token');
    $.connection.hub.url = environment.signalrHubUrl;
    var token = localStorage.getItem('auth_token');
    $.connection.hub.qs = {'access_token': token};

    this.connection = $.connection;

    this.chat = this.connection.faceBotHub;
    this.chat.client.ping = function (message) {
      //alert(message)
      console.log(message);
      // Html encode display name and message.
    };
    $.connection.hub.start().done(function () {
      //chat.server.send('111', '2222');
    });
  }

  // send(message) {
  //   this.chat.server.send(message);
  // }

}
