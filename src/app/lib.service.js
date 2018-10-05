"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var moment = require('moment');
var LibService = (function () {
    function LibService(_restService) {
    }
    LibService.prototype.fromNow = function (date) {
        var local = this.local(date);
        return moment(local).fromNow();
    };
    LibService.prototype.local = function (date) {
        var stillUtc = moment.utc(date).toDate();
        var local = moment(stillUtc).local();
        return local;
    };
    LibService = __decorate([
        core_1.Injectable()
    ], LibService);
    return LibService;
}());
exports.LibService = LibService;
//# sourceMappingURL=lib.service.js.map