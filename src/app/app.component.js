"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent(_authService, _growlService, _adsLibService) {
        this._authService = _authService;
        this._growlService = _growlService;
        this._adsLibService = _adsLibService;
        this.slides = [
            { img: "http://placehold.it/350x150/000000" },
            { img: "http://placehold.it/350x150/111111" },
            { img: "http://placehold.it/350x150/333333" },
            { img: "http://placehold.it/350x150/666666" }
        ];
        this.slideConfig = { "slidesToShow": 4, "slidesToScroll": 4 };
        //this.toastr.setRootViewContainerRef(vRef);
    }
    AppComponent.prototype.afterChange = function (e) {
        console.log('afterChange');
    };
    AppComponent.prototype.ngOnInit = function () {
        this._authService.downloadUser();
        if (this._authService.getIsLoggedIn()) {
            this._adsLibService.downloadLabels();
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'pm-app',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map