"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var InfoComponent = (function () {
    function InfoComponent(_authService, _restService, _growlService) {
        this._authService = _authService;
        this._restService = _restService;
        this._growlService = _growlService;
        this.model = {};
        this.newEmailAlreadyTaken = false;
        this.invalidVerificationCode = false;
        this.allowed = true;
    }
    InfoComponent.prototype.checkUserName = function (e) {
        var _this = this;
        this._restService.get("register", { id: e }).subscribe(function (allowed) {
            _this.allowed = allowed;
            _this.newEmailAlreadyTaken = !allowed;
        });
    };
    InfoComponent.prototype.getCode = function () {
        this.showEnterCodeForm = true;
        //this.alerts.success('Check your email');
        this._growlService.addMessage("success", "Check your email", "");
        this._restService.post("changeEmail", { newEmail: this.model.newEmail }).subscribe(function (x) {
        });
    };
    InfoComponent.prototype.confirmCode = function () {
        var _this = this;
        this._restService.put("changeEmail", { newEmail: this.model.newEmail, code: this.model.code }).subscribe(function (x) {
            console.log("x", x);
            console.log('response from changeEmail');
            _this.showChangeEmailForm = false;
            _this.showEnterCodeForm = false;
            _this.model = {};
            _this._authService.downloadUser();
            _this._growlService.addMessage("success", "new email confirmed", "");
        }, function (er) {
            if (er.status = 400) {
                _this._growlService.addMessage("warning", "Wrong code", "");
                _this.invalidVerificationCode = true;
            }
        });
    };
    InfoComponent.prototype.ngOnInit = function () {
    };
    InfoComponent = __decorate([
        core_1.Component({
            selector: 'fb-info',
            templateUrl: './info.component.html',
            styleUrls: ['../account.scss']
        })
    ], InfoComponent);
    return InfoComponent;
}());
exports.InfoComponent = InfoComponent;
//# sourceMappingURL=info.component.js.map