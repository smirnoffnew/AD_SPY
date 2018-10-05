"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AuthGuard = (function () {
    function AuthGuard(_authService, _router, _restService) {
        this._authService = _authService;
        this._router = _router;
        this._restService = _restService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        return this._authService.getIsLoggedIn();
    };
    AuthGuard.prototype.canActivateChild = function (route, state) {
        return this.canActivate(route, state);
    };
    AuthGuard.prototype.canLoad = function (route) {
        var url = "/" + route.path;
        return this.checkLogin(url);
    };
    AuthGuard.prototype.checkLogin = function (url) {
        if (this._authService.getIsLoggedIn() && this._authService.emailConfirmed()) {
            return true;
        }
        if (this._authService.getIsLoggedIn() && !this._authService.emailConfirmed()) {
            this._router.navigate(['/verify-email']);
            return false;
        }
        // Store the attempted URL for redirecting
        //this._authService.redirectUrl = url;
        // Create a dummy session id
        //let sessionId = 123456789;
        // Set our navigation extras object
        // that contains our global query params and fragment
        //let navigationExtras: NavigationExtras = {
        //queryParams: { 'session_id': sessionId },
        //fragment: 'anchor'
        //};
        // Navigate to the login page with extras
        this._router.navigate(['/login']);
        return false;
    };
    AuthGuard = __decorate([
        core_1.Injectable()
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth-guard.service.js.map