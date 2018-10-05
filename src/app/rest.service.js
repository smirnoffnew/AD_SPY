"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var environment_1 = require('../environments/environment');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var Rx_1 = require('rxjs/Rx');
var RestService = (function () {
    function RestService(_http, _router, _growlService) {
        this._http = _http;
        this._router = _router;
        this._growlService = _growlService;
        this._adUrl = environment_1.environment.apiUrl;
        this.loading = 0;
        this.serverError$ = new Rx_1.ReplaySubject(1);
        this.serverError$.next(false);
    }
    RestService.prototype.headers = function () {
        var headers = new http_1.Headers();
        var authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', "Bearer " + authToken);
        return headers;
    };
    RestService.prototype.isLoading = function () {
        return this.loading > 0;
    };
    RestService.prototype.refreshLoadingCounter = function (counterValue) {
        this.loading = counterValue ? counterValue : 0;
    };
    RestService.prototype.delete = function (endPoint, id) {
        var _this = this;
        this.loading++;
        return this._http.delete(this._adUrl + endPoint + "/" + id, { headers: this.headers() })
            ._do(function () {
            _this.loading--;
        })
            .map(function (response) { return response["_body"] ? response.json() : null; })
            .catch(function (err) { return _this.handleError(err, _this); });
    };
    RestService.prototype.get = function (endPoint, params) {
        var _this = this;
        if (params === void 0) { params = null; }
        this.loading++;
        var qStr = params ? $.param(params) : '';
        return this._http.get(this._adUrl + endPoint + "?" + qStr, { headers: this.headers() })
            ._do(function () {
            _this.loading--;
        })
            .map(function (response) { return response["_body"] ? response.json() : null; })
            .catch(function (err) { return _this.handleError(err, _this); });
    };
    RestService.prototype.getSingle = function (endPoint, params) {
        var _this = this;
        this.loading++;
        var qStr = $.param(params);
        return this._http.get(this._adUrl + endPoint + "?" + qStr, { headers: this.headers() })
            ._do(function () {
            _this.loading--;
        })
            .map(function (response) { return response["_body"] ? response.json() : null; })
            .catch(function (err) { return _this.handleError(err, _this); });
    };
    RestService.prototype.post = function (endPoint, params, options) {
        var _this = this;
        if (options === void 0) { options = null; }
        this.loading++;
        if (!options)
            options = { headers: this.headers() };
        return this._http.post(this._adUrl + endPoint, params, options)
            ._do(function () {
            _this.loading--;
        })
            .map(function (response) { return response["_body"] ? response.json() : null; })
            .catch(function (err) { return _this.handleError(err, _this); });
    };
    RestService.prototype.put = function (endPoint, params) {
        var _this = this;
        this.loading++;
        return this._http.put(this._adUrl + endPoint, params, { headers: this.headers() })
            ._do(function () {
            _this.loading--;
        })
            .map(function (response) { return response["_body"] ? response.json() : null; })
            .catch(function (err) { return _this.handleError(err, _this); });
    };
    RestService.prototype.handleError = function (err, thisService) {
        var error = err;
        var message;
        var text = error.text();
        if (text) {
            var errorObj = JSON.parse(text);
            message = errorObj.message ? errorObj.message : errorObj.error_description;
        }
        console.log(error.text());
        thisService.loading--;
        if (error.status == 401) {
            localStorage.removeItem('auth_token');
            location.reload();
        }
        if (error.status == 400) {
            this._growlService.addMessage("warn", "Error", message);
        }
        if (error.status == 500) {
            this._growlService.addMessage("warn", "Error", "sorry there was a server error");
            this._router.navigate(['server-error']);
            this.serverError$.next(true);
        }
        return Observable_1.Observable.throw(error);
    };
    RestService = __decorate([
        core_1.Injectable()
    ], RestService);
    return RestService;
}());
exports.RestService = RestService;
//# sourceMappingURL=rest.service.js.map