"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var HistoryComponent = (function () {
    function HistoryComponent(_restService) {
        this._restService = _restService;
    }
    HistoryComponent.prototype.getHistory = function () {
        var _this = this;
        this._restService.get("history").subscribe(function (history) {
            _this.history = history;
        });
    };
    HistoryComponent.prototype.ngOnInit = function () {
        this.getHistory();
    };
    HistoryComponent = __decorate([
        core_1.Component({
            templateUrl: './history.component.html',
            styleUrls: ['./history.component.css']
        })
    ], HistoryComponent);
    return HistoryComponent;
}());
exports.HistoryComponent = HistoryComponent;
//# sourceMappingURL=history.component.js.map