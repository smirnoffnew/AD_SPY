"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/observable/of');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
require('rxjs/add/operator/delay');
var http_1 = require('@angular/http');
var environment_1 = require("../environments/environment");
var AuthService = (function () {
    // store the URL so we can redirect after logging in
    function AuthService(_router, _restService, _libService) {
        this._router = _router;
        this._restService = _restService;
        this._libService = _libService;
        this._isLoggedIn = false;
        this._emailConfirmed = false;
        this._subscriptionValid = false;
        this._isLoggedIn = !!localStorage.getItem('auth_token');
    }
    AuthService.prototype.getIsLoggedIn = function () {
        return this._isLoggedIn;
    };
    AuthService.prototype.setIsLoggedIn = function (val) {
        this._isLoggedIn = val;
    };
    AuthService.prototype.login = function (loginModel) {
        var loginData = {
            grant_type: 'password',
            userName: loginModel.userName,
            password: loginModel.password
        };
        var body = new http_1.URLSearchParams();
        body.set('username', loginModel.userName);
        body.set('password', loginModel.password);
        body.set('grant_type', 'password');
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._restService.post("token", body, options);
    };
    AuthService.prototype.getUser = function () {
        return this._user;
    };
    AuthService.prototype.isLoadingUser = function () {
        return this.loading;
    };
    //we are handling errors here because there is a custom spinner
    AuthService.prototype.downloadUser = function () {
        var _this = this;
        if (!!localStorage.getItem('auth_token')) {
            this.loading = true;
            this._restService.get("user", {}).subscribe(function (user) {
                _this.loading = false;
                _this._user = user;
                _this.user = user;
                if (user && !user.emailConfirmed) {
                    _this._router.navigate(['/verify-email']);
                }
                else if (user && !user.subscriptionValid) {
                    _this._router.navigate(['/account/subscription']);
                }
            }, function (err) {
                _this.loading = false;
            });
        }
    };
    AuthService.prototype.emailConfirmed = function () {
        return this._emailConfirmed;
    };
    AuthService.prototype.getSubscriptionValid = function () {
        if (this._user != null) {
            return this._user.viewsLeft > 0;
        }
    };
    AuthService.prototype.getSubscriptionValidObservable = function () {
        if (this._user != null) {
            return this._user.viewsLeft > 0;
        }
        else {
            this.downloadUser();
            return this._restService.getSingle("SubscriptionValid", {}).first();
        }
    };
    AuthService.prototype.getUserName = function () {
        return this._userName;
    };
    AuthService.prototype.removeStripeCustomerName = function () {
        this._user.stripeCustomerId = null;
    };
    AuthService.prototype.setEmailConfirmed = function () {
        this._emailConfirmed = true;
    };
    AuthService.prototype.setSubscriptionValid = function (value) {
        this._user.subscriptionValid = value;
    };
    AuthService.prototype.setUserCookie = function (data) {
        localStorage.setItem("auth_token", data.access_token);
        this.setIsLoggedIn(true);
        var d = new Date();
        d.setTime(d.getTime() + (1000 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = "login=true;" + expires + ";path=/;domain=." + environment_1.environment.bareUrl;
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('auth_token');
        this._isLoggedIn = false;
        var d = new Date();
        document.cookie = "login=false;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + environment_1.environment.bareUrl;
    };
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map