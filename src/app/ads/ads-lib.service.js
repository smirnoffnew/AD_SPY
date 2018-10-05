"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AdsLibService = (function () {
    function AdsLibService(_restService, router) {
        this._restService = _restService;
        this.router = router;
        this._labels = [];
        this.labels = [];
        this.searchQueries = [];
        this.navFilters = {};
        this._orderByLabels = [
            { value: 'created_on_desc', label: 'Date (recent on top)', ig: true },
            { value: 'created_on_asc', label: 'Date (oldest on top)', ig: true },
            { value: 'total_likes', label: 'Likes', ig: true },
            { value: 'total_loves', label: 'Love' },
            { value: 'total_hahas', label: 'Haha' },
            { value: 'total_wows', label: 'Wow' },
            { value: 'total_sads', label: 'Sad' },
            { value: 'total_angrys', label: 'Angry' },
            { value: 'total_shares', label: 'Shares' },
            { value: 'run_time', label: 'Longest running', ig: true },
        ];
        this.filterLabels = [
            { key: 'mediaType', label: 'Media type' },
            { key: 'dailyLikes', label: 'Daily likes', isArray: true, max: 1000 },
            { key: 'totalLikes', label: 'Total likes', isArray: true, max: 100000 },
            { key: 'ages', label: 'Age', isArray: true, max: 65 },
            { key: 'siteType', label: 'Site Type' },
            { key: 'gender', label: 'Gender' },
            { key: 'seenAfter', label: 'Seen After' },
            { key: 'orderBy', label: 'Order By' },
            { key: 'texts', label: 'Ad Text' },
            { key: 'urls', label: 'URL' },
            { key: 'lp_urls', label: 'Landing Page URL' },
            { key: 'comments', label: 'Comments' },
            { key: 'countries', label: 'Country' },
            { key: 'advertisers', label: 'Advertiser' },
            { key: 'mediaType', label: 'Media Type' },
            { key: 'affNetwork', label: 'Affiliate Network' },
            { key: 'affId', label: 'Affiliate Id' },
            { key: 'offerId', label: 'Offer Id' },
            { key: 'label', label: 'Label' },
        ];
    }
    AdsLibService.prototype.searchBoxes = function () {
        var cities = [];
        cities.push({ label: 'Ad Text', type: 'texts' });
        cities.push({ label: 'Comments', type: 'comments' });
        cities.push({ label: 'Advertiser', type: 'advertisers' });
        cities.push({ label: 'URL', type: 'urls' });
        cities.push({ label: 'Landing Page URL', type: 'lp_urls' });
        cities.push({ label: 'Country', type: 'countries', completer: true });
        return cities;
    };
    AdsLibService.prototype.searchBoxesForDd = function () {
        var t = this.searchBoxes().map(function (x) {
            return { label: x.label, value: x.type };
        });
        return t;
    };
    AdsLibService.prototype.removeKey = function (key) {
        delete this.navFilters[key];
        this.router.navigate(['/ads', this.navFilters]);
    };
    AdsLibService.prototype.getOrderByLabels = function (siteType) {
        //console.log('getOrderByLabels fired, siteType: ',siteType)
        if (siteType == 'Instagram') {
            var f = this._orderByLabels.filter(function (x) { return x.ig; });
            //console.log('_orderByLabels ',f)
            return f;
        }
        return this._orderByLabels;
    };
    AdsLibService.prototype.getNavFiltersKeys = function (navFilters) {
        if (!navFilters)
            navFilters = this.navFilters;
        var copy = Object.assign({}, navFilters);
        delete copy.searches;
        delete copy.selectedValue;
        var navFiltersKeys = Object.keys(copy);
        return navFiltersKeys;
    };
    AdsLibService.prototype.nonCurrentSearches = function () {
        return this.searchQueries.filter(function (p) { return !p.current; });
    };
    AdsLibService.prototype.getlabel = function (key) {
        var o = this.filterLabels.find(function (f) { return f.key == key; });
        if (o)
            return o.label;
        return "not found key:" + key;
    };
    AdsLibService.prototype.fancyfy = function (str) {
        if (str)
            str = str.replace(/\[/g, "［").replace(/\]/g, "］").replace(/{/g, "｛").replace(/}/g, "｝").replace(/:/g, "˸")
                .replace(/ /g, " ").replace(/,/g, "，");
        return str;
    };
    AdsLibService.prototype.deFancyfy = function (str) {
        if (str)
            str = str.replace(/［/g, "[").replace(/］/g, "]").replace(/｛/g, "{").replace(/｝/g, "}").replace(/˸/g, ":")
                .replace(/ /g, " ").replace(/，/g, ",");
        return str;
    };
    // getLabels() {
    //   return this._labels.map(x=> {
    //     return {'label': x, 'value': x}
    //   });
    // }
    AdsLibService.prototype.downloadLabels = function () {
        var _this = this;
        this._restService.get("label").subscribe(function (labels) {
            _this.labels = labels.map(function (x) {
                return { 'label': x, 'value': x };
            });
        });
    };
    AdsLibService = __decorate([
        core_1.Injectable()
    ], AdsLibService);
    return AdsLibService;
}());
exports.AdsLibService = AdsLibService;
//# sourceMappingURL=ads-lib.service.js.map