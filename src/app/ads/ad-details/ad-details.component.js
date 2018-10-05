"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var _ = require('lodash');
var moment = require('moment');
var AdDetailsComponent = (function () {
    function AdDetailsComponent(_restService, _router, _route) {
        this._restService = _restService;
        this._router = _router;
        this._route = _route;
        this.backgroundColors = ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#3B3EAC", "#0099C6", "#DD4477", "#66AA00", "#B82E2E", "#316395", "#994499", "#22AA99", "#AAAA11", "#6633CC", "#E67300", "#8B0707", "#329262", "#5574A6", "#3B3EAC"];
    }
    AdDetailsComponent.prototype.loadAd = function () {
        var _this = this;
        this._restService.get("ad", { id: this.id, dummy: true }).subscribe(function (ad) {
            _this.ad = ad;
            //this.techStack = ad.techstack;
            //console.log(this.techStack)
            _this.genderData = {
                labels: ad.genderStats.map(function (x) { return x.key ? x.key : 'Unknown'; }),
                datasets: [
                    {
                        data: ad.genderStats.map(function (x) { return x.count; }),
                        backgroundColor: _this.backgroundColors
                    }]
            };
            _this.countryData = {
                labels: ad.countryStats.map(function (x) { return x.key ? x.key : 'Unknown'; }),
                datasets: [
                    {
                        data: ad.countryStats.map(function (x) { return x.count; }),
                        backgroundColor: _this.backgroundColors
                    }]
            };
            _this.ageData = {
                labels: ad.ageStats.map(function (x) { return x.key + ' - ' + (parseInt(x.key) + 10); }),
                datasets: [
                    {
                        data: ad.ageStats.map(function (x) { return x.count; }),
                        backgroundColor: _this.backgroundColors
                    }]
            };
        });
    };
    AdDetailsComponent.prototype.ngOnInit = function () {
        this.id = this._route.snapshot.params['id'];
        this.loadAd();
        this.getChart();
    };
    AdDetailsComponent.prototype.ngAfterViewInit = function () {
    };
    AdDetailsComponent.prototype.getChart = function () {
        var _this = this;
        this._restService.get("likes", { id: this.id }).subscribe(function (resp) {
            if (resp.length == 1)
                return;
            var labels = _.map(resp, function (item) {
                return moment(Date.parse(item.takenOn)).format("DD MMM");
            });
            _this.data = {
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                                type: 'time',
                                time: {
                                    displayFormats: {
                                        'millisecond': 'MMM DD',
                                        'second': 'MMM DD',
                                        'minute': 'MMM DD',
                                        'hour': 'MMM DD',
                                        'day': 'MMM DD',
                                        'week': 'MMM DD',
                                        'month': 'MMM DD',
                                        'quarter': 'MMM DD',
                                        'year': 'MMM DD'
                                    }
                                }
                            }]
                    }
                },
                labels: labels,
                datasets: [{
                        label: 'Likes over time',
                        data: _.map(resp, function (item) {
                            return item.likeNum;
                        }),
                        fill: true,
                        borderColor: '#4bc0c0'
                    }]
            };
            setTimeout(function () {
                if (_this.chart)
                    _this.chart.reinit();
            }, 300);
        });
    };
    __decorate([
        core_1.ViewChild('chart')
    ], AdDetailsComponent.prototype, "chart");
    __decorate([
        core_1.ViewChild('genderChart')
    ], AdDetailsComponent.prototype, "genderChart");
    __decorate([
        core_1.ViewChild('countryChart')
    ], AdDetailsComponent.prototype, "countryChart");
    __decorate([
        core_1.ViewChild('ageChart')
    ], AdDetailsComponent.prototype, "ageChart");
    AdDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-ad-details',
            templateUrl: './ad-details.component.html',
            styleUrls: ['./ad-details.component.css']
        })
    ], AdDetailsComponent);
    return AdDetailsComponent;
}());
exports.AdDetailsComponent = AdDetailsComponent;
//# sourceMappingURL=ad-details.component.js.map