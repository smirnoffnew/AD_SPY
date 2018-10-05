"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var EmailCodeComponent = (function () {
    function EmailCodeComponent(_authService, _router, _route, _restService) {
        this._authService = _authService;
        this._router = _router;
        this._route = _route;
        this._restService = _restService;
        this.model = {};
        _authService.errorMessage = "";
    }
    EmailCodeComponent.prototype.confirmEmail = function () {
    };
    EmailCodeComponent.prototype.ngOnInit = function () {
        var _this = this;
        var params = this._route.snapshot.params;
        var code = params.code;
        this._restService.get("ConfirmEmail", { code: code }).subscribe(function () {
            //alert(1)
            _this._authService.setEmailConfirmed();
            if (!_this.done) {
                _this._router.navigate(["ads"]);
                _this.done = true;
            }
        }); //,;
        // this.subscription = this._router.events
        //   .subscribe((event) => {
        //     if (event instanceof NavigationEnd) {
        //
        //     }
        //   });
    };
    EmailCodeComponent = __decorate([
        core_1.Component({
            template: ''
        })
    ], EmailCodeComponent);
    return EmailCodeComponent;
}());
exports.EmailCodeComponent = EmailCodeComponent;
//# sourceMappingURL=email-code.component.js.map