"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var environment_1 = require('../environments/environment');
var SignalRService = (function () {
    function SignalRService() {
        //this._isLoggedIn = !!localStorage.getItem('auth_token');
        $.connection.hub.url = environment_1.environment.signalrHubUrl;
        var token = localStorage.getItem('auth_token');
        $.connection.hub.qs = { 'access_token': token };
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
    SignalRService = __decorate([
        core_1.Injectable()
    ], SignalRService);
    return SignalRService;
}());
exports.SignalRService = SignalRService;
//# sourceMappingURL=signalR.service.js.map