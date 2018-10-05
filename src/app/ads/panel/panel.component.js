"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_1 = require("@angular/router");
var moment = require('moment');
var PanelComponent = (function () {
    function PanelComponent(_restService, router, route, 
        //private completerService:CompleterService,
        _location, _adsLibService) {
        this._restService = _restService;
        this.router = router;
        this.route = route;
        this._location = _location;
        this._adsLibService = _adsLibService;
        this.onNavFiltersReady = new core_1.EventEmitter(true);
        this.searchBoxes = [];
        this.countries = [];
        this.labels = [];
        this.filters = {};
        this.overlays = [];
        this.navFiltersKeys = [];
    }
    PanelComponent.prototype.searchCountry = function (event) {
        this.countryMatches = this.countries
            .filter(function (x) { return x.name.toLowerCase().includes(event.query.toLowerCase()); }).map(function (x) { return x.name; });
    };
    PanelComponent.prototype.clearAll = function () {
        this.filters = {};
        this.initFilters();
        this.updateUrl();
    };
    PanelComponent.prototype.undo = function () {
        this.wasCleared = false;
        this._location.back();
    };
    PanelComponent.prototype.countrySelected = function () {
        var _this = this;
        var match = this.countries.find(function (c) { return c.name == _this.country; });
        if (!match)
            return;
        this._adsLibService.searchQueries.push({ type: 'countries', value: this.country, locked: false });
        setTimeout(function () {
            _this.country = null;
        }, 100);
        this.updateUrl();
    };
    PanelComponent.prototype.search = function () {
        var _this = this;
        var current = this._adsLibService.searchQueries.find(function (p) { return p.type == _this.filters.selectedValue && p.current; });
        var value = this.searchBoxes.find(function (s) { return s.type == _this.filters.selectedValue; }).value;
        if (current) {
            current.value = value;
        }
        else {
            this._adsLibService.searchQueries.push({ type: this.filters.selectedValue, value: value, current: true });
        }
        this.updateUrl();
    };
    PanelComponent.prototype.removeParam = function (param) {
        this._adsLibService.searchQueries = this._adsLibService.searchQueries.filter(function (p) {
            return p.type != param.type || p.value != param.value;
        });
        this.updateUrl();
    };
    PanelComponent.prototype.addCurrentToParams = function () {
        var _this = this;
        var value = this.searchBoxes.find(function (s) { return s.type == _this.filters.selectedValue; }).value;
        this.removeParam({ type: this.filters.selectedValue, value: value }); //remove current
        this._adsLibService.searchQueries.push({ type: this.filters.selectedValue, value: value, locked: false });
        this.updateUrl();
    };
    PanelComponent.prototype.disablePreview = function () {
        var _this = this;
        var targetBox = this.searchBoxes.find(function (s) { return s.type == _this.filters.selectedValue; });
        if (targetBox && targetBox.value)
            return false;
        return true;
    };
    PanelComponent.prototype.disableAdd = function () {
        var _this = this;
        var targetBox = this.searchBoxes.find(function (s) { return s.type == _this.filters.selectedValue; });
        var targetParam = this._adsLibService.searchQueries.find(function (s) { return s.current && s.type == _this.filters.selectedValue; });
        if (targetBox && targetParam && targetBox.value == targetParam.value)
            return false;
        return true;
    };
    PanelComponent.prototype.onSelectChange = function () {
        for (var _i = 0, _a = this.searchBoxes; _i < _a.length; _i++) {
            var searchBox = _a[_i];
            searchBox.value = '';
        }
        this._adsLibService.searchQueries = this._adsLibService.searchQueries.filter(function (p) { return !p.current; });
        //this.updateUrl();
    };
    PanelComponent.prototype.ageChange = function () {
        this.filters.fromAge = this.filters.ages[0];
        this.filters.toAge = this.filters.ages[1];
        this.updateUrl();
    };
    PanelComponent.prototype.boxesWithValueNum = function () {
        return this._adsLibService.searchQueries.filter(function (b) { return b.current && b.value; }).length;
    };
    PanelComponent.prototype.toggle = function (el, $event) {
        this.overlays.forEach(function (x) {
            if (x.id != el.id) {
                if (x.isOpen) {
                    x.hide(x.$event);
                }
            }
        });
        el.toggle($event);
        //el.isOpen = !el.isOpen
        var e = this.overlays.find(function (x) { return x.id == el.id; });
        if (!e) {
            el.id = new Date().getTime();
            el.$event = $event;
            this.overlays.push(el);
        }
    };
    PanelComponent.prototype.initSearchBoxes = function () {
        this.dd = this._adsLibService.searchBoxesForDd();
        this.searchBoxes = this._adsLibService.searchBoxes();
        var _loop_1 = function(box) {
            filter = this_1._adsLibService.searchQueries.find(function (f) { return f.type == box.type && f.current; });
            if (filter) {
                box.value = filter.value;
            }
            else {
                box.value = '';
            }
        };
        var this_1 = this;
        var filter;
        for (var _i = 0, _a = this.searchBoxes; _i < _a.length; _i++) {
            var box = _a[_i];
            _loop_1(box);
        }
    };
    PanelComponent.prototype.clearFilters = function () {
        this.wasCleared = true;
        this.filters = {};
        this.router.navigate(['/ads']);
    };
    PanelComponent.prototype.constructNonDefaltFilters = function () {
        var ajaxFilters = {};
        var navFilters = {};
        //this._adsLibService.navFilters = {};
        if (this.seenAfterDate) {
            navFilters.seenAfter = moment(this.seenAfterDate).format('DD-MMM-YYYY');
            ajaxFilters.seenAfter = this.seenAfterDate;
        }
        if ((this.filters.ages[0] != 18 || this.filters.ages[1] != 65)) {
            var ages = this.filters.ages.slice(); //clone
            if (ages[1] == 65)
                ages.splice(1, 1);
            navFilters.ages = this._adsLibService.fancyfy(JSON.stringify(ages));
            ajaxFilters.ages = ages;
        }
        if ((this.filters.dailyLikes[0] != 0 || this.filters.dailyLikes[1] != 1000)) {
            var dailyLikes = this.filters.dailyLikes.slice(); //clone
            if (dailyLikes[1] == 1000)
                dailyLikes.splice(1, 1);
            navFilters.dailyLikes = this._adsLibService.fancyfy(JSON.stringify(dailyLikes));
            ajaxFilters.dailyLikes = dailyLikes;
        }
        if ((this.filters.totalLikes[0] != 0 || this.filters.totalLikes[1] != 100000)) {
            var totalLikes = this.filters.totalLikes.slice(); //clone
            if (totalLikes[1] == 100000)
                totalLikes.splice(1, 1);
            navFilters.totalLikes = this._adsLibService.fancyfy(JSON.stringify(totalLikes));
            ajaxFilters.totalLikes = totalLikes;
        }
        if (this.filters.siteType != 'all') {
            navFilters.siteType = this.filters.siteType;
            ajaxFilters.siteType = this.filters.siteType;
        }
        if (this.filters.gender != 'all') {
            navFilters.gender = this.filters.gender;
            ajaxFilters.gender = this.filters.gender;
        }
        if (this.filters.mediaType != 'all') {
            navFilters.mediaType = this.filters.mediaType;
            ajaxFilters.mediaType = this.filters.mediaType;
        }
        if (this.filters.orderBy != 'created_on_desc') {
            navFilters.orderBy = this.filters.orderBy;
            ajaxFilters.orderBy = this.filters.orderBy;
        }
        if (this.filters.label) {
            navFilters.label = this.filters.label;
            ajaxFilters.label = this.filters.label;
        }
        if (this._adsLibService.searchQueries.length > 0) {
            navFilters.searches = this._adsLibService.fancyfy(JSON.stringify(this._adsLibService.searchQueries));
            ajaxFilters.searches = this._adsLibService.searchQueries;
        }
        if (this.filters.selectedValue != 'texts') {
            navFilters.selectedValue = this.filters.selectedValue;
            ajaxFilters.selectedValue = this.filters.selectedValue;
        }
        if (this.filters.affNetwork) {
            navFilters.affNetwork = this.filters.affNetwork;
            ajaxFilters.affNetwork = this.filters.affNetwork;
        }
        if (this.filters.affId) {
            navFilters.affId = this.filters.affId;
            ajaxFilters.affId = this.filters.affId;
        }
        if (this.filters.offerId) {
            navFilters.offerId = this.filters.offerId;
            ajaxFilters.offerId = this.filters.offerId;
        }
        if (this.filters.label) {
            navFilters.label = this.filters.label;
            ajaxFilters.label = this.filters.label;
        }
        return { navFilters: navFilters, ajaxFilters: ajaxFilters };
    };
    PanelComponent.prototype.onSiteTypeChange = function (e) {
        var _this = this;
        this.orders = this._adsLibService.getOrderByLabels(this.filters.siteType);
        this.filters.ortderBy = this.orders[0].key;
        setTimeout(function () {
            _this.updateUrl();
        }, 100);
    };
    PanelComponent.prototype.updateUrl = function () {
        this.wasCleared = false;
        this._adsLibService.navFilters = this.constructNonDefaltFilters().navFilters;
        //this._adsLibService.navFiltersKeys = Object.keys(navFilters); //duplicate with nav-filters
        this.router.navigate(['/ads', this._adsLibService.navFilters]);
    };
    PanelComponent.prototype.initFilters = function () {
        var _this = this;
        var navParams = Object.assign({}, this.route.snapshot.params);
        //selectedValue
        this.filters.selectedValue = navParams.selectedValue ? navParams.selectedValue : "texts";
        //searchQueries
        if (navParams.searches) {
            this._adsLibService.searchQueries = JSON.parse(this._adsLibService.deFancyfy(navParams.searches));
        }
        else {
            this._adsLibService.searchQueries = [];
        }
        //ages
        if (navParams.ages) {
            this.filters.ages = JSON.parse(this._adsLibService.deFancyfy(navParams.ages));
            if (this.filters.ages.length == 1) {
                this.filters.ages = [this.filters.ages[0], 65];
            }
        }
        else {
            this.filters.ages = [18, 65];
        }
        //siteType
        if (!navParams.siteType) {
            this.filters.siteType = "all";
        }
        else {
            this.filters.siteType = navParams.siteType;
        }
        //gender
        if (!navParams.gender) {
            this.filters.gender = "all";
        }
        else {
            this.filters.gender = navParams.gender;
        }
        //orderBy
        if (!navParams.orderBy) {
            this.filters.orderBy = "created_on_desc";
        }
        else {
            this.filters.orderBy = navParams.orderBy;
        }
        //mediaType
        if (!navParams.mediaType) {
            this.filters.mediaType = "all";
        }
        else {
            this.filters.mediaType = navParams.mediaType;
        }
        if (navParams.dailyLikes) {
            this.filters.dailyLikes = JSON.parse(this._adsLibService.deFancyfy(navParams.dailyLikes));
            if (this.filters.dailyLikes.length == 1) {
                this.filters.dailyLikes = [this.filters.dailyLikes[0], 1000];
            }
        }
        else {
            this.filters.dailyLikes = [0, 1000];
        }
        if (navParams.totalLikes) {
            this.filters.totalLikes = JSON.parse(this._adsLibService.deFancyfy(navParams.totalLikes));
            if (this.filters.totalLikes.length == 1) {
                this.filters.totalLikes = [this.filters.totalLikes[0], 100000];
            }
        }
        else {
            this.filters.totalLikes = [0, 100000];
        }
        if (navParams.affNetwork) {
            this.filters.affNetwork = navParams.affNetwork;
        }
        // if (!navParams.affNetwork) {
        //   this.filters.affNetwork = "all"
        // }
        // else {
        //   this.filters.affNetwork = navParams.affNetwork;
        // }
        this.filters.affId = navParams.affId;
        this.filters.offerId = navParams.offerId;
        this.filters.label = navParams.label;
        this.seenAfterDate = navParams.seenAfter;
        this.initSearchBoxes();
        this._restService.get("UserCountry").subscribe(function (countries) {
            _this.countries = countries;
            //this.countryDataService = this.completerService.local(this.countries, 'name', 'name');
        });
        var filters = this.constructNonDefaltFilters();
        this._adsLibService.navFilters = filters.navFilters;
        var ajaxFilters = filters.ajaxFilters;
        this.onNavFiltersReady.emit(ajaxFilters);
    };
    PanelComponent.prototype.getAffNetworks = function () {
        var _this = this;
        this._restService.get("affNetwork").subscribe(function (affNetworks) {
            console.log('affNetworks', affNetworks);
            _this._adsLibService.affNetworks = affNetworks.map(function (x) {
                return { 'label': x.name, 'value': x.id };
            });
            ;
            //this.labels=labels
            // can use same principle for labels
            _this.filtersReady = true;
        });
    };
    PanelComponent.prototype.loadPage = function () {
        this.initFilters();
        this.getAffNetworks();
        this.orders = this._adsLibService.getOrderByLabels(this.filters.siteType);
    };
    PanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadPage();
        this.subscription = this.router.events
            .subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                _this.loadPage();
            }
        });
    };
    PanelComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    __decorate([
        core_1.Output()
    ], PanelComponent.prototype, "onNavFiltersReady");
    PanelComponent = __decorate([
        core_1.Component({
            selector: 'fb-panel',
            templateUrl: './panel.component.html',
            styleUrls: ['./panel.component.scss']
        })
    ], PanelComponent);
    return PanelComponent;
}());
exports.PanelComponent = PanelComponent;
//# sourceMappingURL=panel.component.js.map