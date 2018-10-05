"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var NavFiltersComponent = (function () {
    function NavFiltersComponent(_adsLibService) {
        this._adsLibService = _adsLibService;
    }
    NavFiltersComponent.prototype.get1 = function () {
        return this.filters;
    };
    NavFiltersComponent.prototype.constructLabel = function (key, filters) {
        var filterLabel = this._adsLibService.filterLabels.find(function (f) { return f.key == key; });
        if (!filterLabel)
            return "";
        var keys = Object.keys(filters);
        var filterKey = keys.find(function (k) { return k == key; });
        var value = filters[key];
        var totalLabel = filterLabel.label + ": ";
        if (filterLabel.isArray) {
            var arr = JSON.parse(this._adsLibService.deFancyfy(value));
            if (!arr[1]) {
                totalLabel += 'from ' + arr[0].toLocaleString() + ' to ' + filterLabel.max.toLocaleString() + "+";
            }
            else {
                totalLabel += 'from ' + arr[0].toLocaleString() + ' to ' + arr[1].toLocaleString();
            }
        }
        else {
            if (key == 'orderBy') {
                totalLabel += this._adsLibService.getOrderByLabels().find(function (l) { return l.value == value; }).label;
            }
            else if (key == 'affNetwork' && this._adsLibService.affNetworks) {
                totalLabel += this._adsLibService.affNetworks.filter(function (a) { return a.value == value; })[0].label;
            }
            else {
                totalLabel += value;
            }
        }
        return totalLabel;
    };
    NavFiltersComponent.prototype.getKeys = function () {
        var keys = this._adsLibService.getNavFiltersKeys(this.filters);
        //console.log("keys ~~~:",keys )
        return keys;
        //console.log(this.filters)
        // if (this.filters) {
        //   return this._adsLibService.getNavFiltersKeys(this.filters)
        // }
        // else {
        //   return this._adsLibService.getNavFiltersKeys()
        //
        // }
    };
    NavFiltersComponent.prototype.getFilters = function () {
        if (this.filters)
            return this.filters;
        return this._adsLibService.navFilters;
    };
    __decorate([
        core_1.Input()
    ], NavFiltersComponent.prototype, "showClose");
    __decorate([
        core_1.Input()
    ], NavFiltersComponent.prototype, "filters");
    NavFiltersComponent = __decorate([
        core_1.Component({
            selector: 'fb-nav-filters',
            templateUrl: './nav-filters.component.html',
            styleUrls: ['./nav-filters.component.css']
        })
    ], NavFiltersComponent);
    return NavFiltersComponent;
}());
exports.NavFiltersComponent = NavFiltersComponent;
//# sourceMappingURL=nav-filters.component.js.map