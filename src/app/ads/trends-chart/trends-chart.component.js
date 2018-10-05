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
var TrendsChartComponent = (function () {
    function TrendsChartComponent(_restService) {
        this._restService = _restService;
    }
    TrendsChartComponent.prototype.getChart = function (ajaxParams) {
        var _this = this;
        this._restService.get("adtrend", ajaxParams).subscribe(function (data) {
            var labels = _.map(data, function (item) {
                return moment(Date.parse(item.x)).format("DD MMM");
            });
            console.log('labels', labels);
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
                        label: 'Ad trend',
                        data: _.map(data, function (item) {
                            return item.y;
                        }),
                        fill: true,
                        borderColor: '#4bc0c0'
                    }]
            };
            setTimeout(function () {
                _this.chart.reinit();
            }, 100);
        });
    };
    TrendsChartComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.ViewChild('chart')
    ], TrendsChartComponent.prototype, "chart");
    TrendsChartComponent = __decorate([
        core_1.Component({
            selector: 'fb-trends-chart',
            templateUrl: './trends-chart.component.html',
            styleUrls: ['./trends-chart.component.css']
        })
    ], TrendsChartComponent);
    return TrendsChartComponent;
}());
exports.TrendsChartComponent = TrendsChartComponent;
//# sourceMappingURL=trends-chart.component.js.map