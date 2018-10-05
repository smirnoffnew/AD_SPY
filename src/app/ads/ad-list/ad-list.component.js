"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AdListComponent = (function () {
    function AdListComponent(_restService, router, route, _growlService) {
        this._restService = _restService;
        this.router = router;
        this.route = route;
        this._growlService = _growlService;
        //@ViewChild('trendsChart')
        //trendsChart:TrendsChartComponent;
        this.throttle = 300;
        this.scrollDistance = 20;
        this.ads = [];
        //currentParams:any = {};
        this.currentParams = [];
        //this.actorDataService = completerService.remote(environment.apiUrl + "actor/", 'name', 'name');
        //this.countryDataService = completerService.remote(environment.apiUrl + "userCountry/", 'name', 'name');
    }
    AdListComponent.prototype.onScrollDown = function () {
        if (!this.page)
            this.page = 1;
        else
            this.page++;
        this.loadAds(true);
    };
    AdListComponent.prototype.onNavFiltersReady = function (ajaxFilters) {
        console.log("onNavFiltersReady received");
        this.ajaxFilters = ajaxFilters;
        this.loadAds();
    };
    AdListComponent.prototype.loadAds = function (isScroll) {
        var _this = this;
        if (isScroll === void 0) { isScroll = false; }
        this.loadingAds = true;
        if (!isScroll) {
            this.page = null;
            this.ads = [];
            delete this.emptyResult;
        }
        else if (this.ads.length == 0) {
            return;
        }
        this.ajaxFilters.page = this.page;
        if (!isScroll) {
        }
        this._restService.get("ad", this.ajaxFilters).subscribe(function (ads) {
            _this.showAds(ads);
        }, function (x) {
            if (x.status == 417) {
                _this._growlService.addMessage("warn", "Please buy more views", '');
                setTimeout(function () {
                    _this.router.navigate(['/account']);
                }, 500);
            }
        });
    };
    AdListComponent.prototype.showAds = function (ads) {
        if (ads != null) {
            this.ads = this.ads.concat(ads.data);
        }
        if (this.ads.length == 0) {
            this.emptyResult = true;
        }
        this.loadingAds = false;
    };
    AdListComponent.prototype.changeLabel = function (labelName, ad) {
        ad.labelName = labelName;
        this._restService.post("changelabel", { adId: ad.id, labelName: labelName }).subscribe(function () {
        });
    };
    AdListComponent.prototype.openNewLabel = function (ad) {
        this.labelAd = ad;
    };
    //onLabelsChanged(labels) {
    //this.labels = labels;
    //this.labelNames = labels.map(l => l.labelName);
    //}
    AdListComponent.prototype.onLabelDeleted = function () {
        //this.searches.updateSearches();
    };
    AdListComponent = __decorate([
        core_1.Component({
            templateUrl: './ad-list.component.html',
            styleUrls: ['ad-list.component.css']
        })
    ], AdListComponent);
    return AdListComponent;
}());
exports.AdListComponent = AdListComponent;
//# sourceMappingURL=ad-list.component.js.map