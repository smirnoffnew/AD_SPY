"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Rx_1 = require("rxjs/Rx");
var LoginComponent = (function () {
    function LoginComponent(_router, _libService, _restService, _authService) {
        this._router = _router;
        this._libService = _libService;
        this._restService = _restService;
        this._authService = _authService;
        //message:string;
        this.model = {};
        this.loading = false;
        _authService.errorMessage = "";
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this._authService.login(this.model)
            .catch(function (err) { return _this.handleError(err); })
            .subscribe(function (data) {
            _this.loading = false;
            //todo: need to set app user fully
            _this._authService.setUserCookie(data);
            var emailConfirmed = data.emailConfirmed.toLowerCase() === 'true';
            var subscriptionValid = data.subscriptionValid.toLowerCase() === 'true';
            if (!emailConfirmed) {
                _this._router.navigate(['verify-email']);
            }
            if (subscriptionValid) {
                _this._router.navigate(['ads']);
            }
            if (!subscriptionValid) {
                _this._router.navigate(['account/subscription']);
            }
        });
    };
    LoginComponent.prototype.handleError = function (er) {
        this.loading = false;
        if (er._body.indexOf("incorrect") >= 0) {
            this.errorMessage = "Wrong password or login";
        }
        return Rx_1.Observable.throw(er.json().error || 'Server error');
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map