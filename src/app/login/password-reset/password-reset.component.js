"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var PasswordResetComponent = (function () {
    function PasswordResetComponent(_restService, _router, _route, _growlService) {
        this._restService = _restService;
        this._router = _router;
        this._route = _route;
        this._growlService = _growlService;
        this.model = {};
    }
    PasswordResetComponent.prototype.resetPassword = function () {
        var _this = this;
        this._restService.post("passwordReset", this.model).subscribe(function (x) {
            _this._growlService.addMessage("success", "Done", "Please login");
            _this._router.navigate(['login']);
        }, function (e) {
            if (e.status == 400)
                _this._router.navigate(['forgot-password']);
        });
    };
    PasswordResetComponent.prototype.ngOnInit = function () {
        this.model.code = this._route.snapshot.params['code'];
        this.model.email = this._route.snapshot.params['email'];
    };
    PasswordResetComponent = __decorate([
        core_1.Component({
            selector: 'app-password-reset',
            templateUrl: './password-reset.component.html',
            styleUrls: ['./password-reset.component.css']
        })
    ], PasswordResetComponent);
    return PasswordResetComponent;
}());
exports.PasswordResetComponent = PasswordResetComponent;
//# sourceMappingURL=password-reset.component.js.map