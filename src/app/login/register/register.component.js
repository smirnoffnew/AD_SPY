"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/map');
var RegisterComponent = (function () {
    function RegisterComponent(_restService, _libService, _router, _http, _authService, _activatedRoute) {
        this._restService = _restService;
        this._libService = _libService;
        this._router = _router;
        this._http = _http;
        this._authService = _authService;
        this._activatedRoute = _activatedRoute;
        this.allowed = true;
        this.model = {};
    }
    RegisterComponent.prototype.ngAfterViewInit = function () {
        this.setUserNameCheck();
    };
    RegisterComponent.prototype.setUserNameCheck = function () {
        var _this = this;
        this.regForm.control.valueChanges.debounceTime(500).distinctUntilChanged()
            .subscribe(function (values) {
            return _this.checkUserName(values.userName);
        });
    };
    RegisterComponent.prototype.checkUserName = function (e) {
        var _this = this;
        if (!e)
            return;
        this._restService.get("register", { id: e.trim() }).subscribe(function (x) {
            _this.allowed = x;
            console.log(x);
        });
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.model.aff = this._activatedRoute.snapshot.queryParams.aff;
        this._restService.post("register", this.model).subscribe(function (r) {
            //this.model.grant_type = 'password';
            _this._authService.login(_this.model).subscribe(function (data) {
                localStorage.setItem("auth_token", data.access_token);
                _this._router.navigate(['verify-email']);
            });
            // this._restService.post("token", this.model).subscribe(r=> {
            //   localStorage.setItem('auth_token', '1')
            //   this._router.navigate(['about']);
            // });
            //return Observable.of(true).delay(1000).do(val => this._isLoggedIn = true);
        });
        // this.authService.register("","").subscribe(() => {
        //   this.setMessage();
        //   if (this.authService.isLoggedIn()) {
        //     // Get the redirect URL from our auth service
        //     // If no redirect has been set, use the default
        //     let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/ads';
        //     // Redirect the user
        //     this.router.navigate([redirect]);
        //   }
        // });
    };
    RegisterComponent.prototype.ngOnInit = function () {
        // var queryParams = this._activatedRoute.snapshot.queryParams.aff;
        // console.log(this._activatedRoute.snapshot.queryParams);
        // if(queryParams .aff)
        // {
        //  this.aff = a
        // }
        //console.log("_authService.login",
        //);
        //   this._restService.post("token", loginData).subscribe(r=> {
        //     localStorage.setItem('auth_token', '1')
        //     this._router.navigate(['about']);
        //   });
        //
        //   $.ajax({
        //     type: 'POST',
        //     url: 'http://localhost:64400/api/Token',
        //     data: loginData
        //   }).done(function (data) {
        //     sessionStorage.setItem("tokenKey", data.access_token);
        //   }).fail(showError);
        //
        //   function showError(er) {
        //     console.log(er);
        //
        //   }
        // }
    };
    __decorate([
        core_1.ViewChild('regForm')
    ], RegisterComponent.prototype, "regForm");
    RegisterComponent = __decorate([
        core_1.Component({
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map