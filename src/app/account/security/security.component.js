"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SecurityComponent = (function () {
    //public alerts:Array<Object> = [];
    function SecurityComponent(_restService, _growlService) {
        this._restService = _restService;
        this._growlService = _growlService;
        this.model = {};
    }
    SecurityComponent.prototype.changePassword = function () {
        var _this = this;
        this._restService.post("changePassword", this.model).subscribe(function (r) {
            _this._growlService.addMessage("success", "Password saved!", "");
            _this.model = {};
            _this.changingPassword = false;
        });
    };
    SecurityComponent.prototype.ngOnInit = function () {
    };
    SecurityComponent = __decorate([
        core_1.Component({
            selector: 'fb-security',
            templateUrl: './security.component.html',
            styleUrls: ['../account.scss']
        })
    ], SecurityComponent);
    return SecurityComponent;
}());
exports.SecurityComponent = SecurityComponent;
//# sourceMappingURL=security.component.js.map