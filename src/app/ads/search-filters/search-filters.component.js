"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SearchFiltersComponent = (function () {
    function SearchFiltersComponent(_adsLibService) {
        this._adsLibService = _adsLibService;
    }
    SearchFiltersComponent.prototype.getSearchParams = function () {
        //console.log('this.searches~~~',this.searches)
        if (this.searches) {
            var s = JSON.parse(this._adsLibService.deFancyfy(this.searches));
            //return this.searches
            return s;
        }
        else {
            return this._adsLibService.nonCurrentSearches();
        }
    };
    SearchFiltersComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], SearchFiltersComponent.prototype, "searches");
    SearchFiltersComponent = __decorate([
        core_1.Component({
            selector: 'fb-search-filters',
            templateUrl: './search-filters.component.html',
            styleUrls: ['./search-filters.component.css']
        })
    ], SearchFiltersComponent);
    return SearchFiltersComponent;
}());
exports.SearchFiltersComponent = SearchFiltersComponent;
//# sourceMappingURL=search-filters.component.js.map