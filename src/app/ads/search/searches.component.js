"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var router_1 = require("@angular/router");
var SearchesComponent = (function () {
    function SearchesComponent(_restService, _adsLibService, _growlService, _router, _route) {
        this._restService = _restService;
        this._adsLibService = _adsLibService;
        this._growlService = _growlService;
        this._router = _router;
        this._route = _route;
        this.selectedSearch = 0;
    }
    SearchesComponent.prototype.loadSearch = function (id) {
        var search = this.searches.find(function (s) { return s.id == id; });
        if (search) {
            this._router.navigate(['/ads', search.params]);
        }
    };
    SearchesComponent.prototype.saveSearch = function () {
        var _this = this;
        this._growlService.addMessage("success", "Search saved", "");
        this._restService.post("search", {
            searchName: this.searchName,
            searchParams: this._route.snapshot.params
        }).subscribe(function (r) {
            _this.searchName = null;
            //this.alerts.push({msg: 'Search saved!', type: 'success', closable: true});
            _this.updateSearches();
        });
    };
    SearchesComponent.prototype.updateSearches = function () {
        var _this = this;
        this._restService.get("search").subscribe(function (searches) {
            _this.searches = searches;
            _this.searchesDd = [{ 'label': 'Select Search', 'value': 'select' }].concat(searches);
            //this.searches = [...searches];
            console.log("searches~~", searches);
        });
    };
    SearchesComponent.prototype.delete = function (search) {
        var _this = this;
        this._restService.delete("search", search.id).subscribe(function () {
            _this.updateSearches();
            //this.alerts.push({msg: 'Search deleted!', type: 'success', closable: true});
        });
    };
    SearchesComponent.prototype.hasParams = function () {
        return Object.keys(this._route.snapshot.params).length > 0;
    };
    SearchesComponent.prototype.ngOnInit = function () {
        this.updateSearches();
        this.subscription = this._router.events
            .subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
            }
        });
    };
    // public closeAlert(i:number):void {
    //   this.alerts.splice(i, 1);
    // }
    SearchesComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    SearchesComponent = __decorate([
        core_1.Component({
            selector: 'fb-searches',
            templateUrl: './searches.component.html',
            styleUrls: ['./searches.component.css']
        })
    ], SearchesComponent);
    return SearchesComponent;
}());
exports.SearchesComponent = SearchesComponent;
//# sourceMappingURL=searches.component.js.map