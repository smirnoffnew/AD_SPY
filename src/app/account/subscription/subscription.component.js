"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SubscriptionComponent = (function () {
    function SubscriptionComponent(_authService, _growlService, _accountService, _restService, _router) {
        this._authService = _authService;
        this._growlService = _growlService;
        this._accountService = _accountService;
        this._restService = _restService;
        this._router = _router;
        this.showSubscriptionInfo = false;
        this.couponValid = true;
    }
    SubscriptionComponent.prototype.applyCoupon = function () {
        var _this = this;
        this._restService.get("applyCoupon", { couponId: this.coupon }).subscribe(function () {
            _this._authService.downloadUser();
            _this._growlService.addMessage("success", "Cool", "Coupon applied, enjoy!");
            _this.coupon = null;
        });
    };
    SubscriptionComponent.prototype.cancelSubscription = function () {
        var _this = this;
        this._restService.delete("subscribe", '').subscribe(function () {
            _this._authService.removeStripeCustomerName();
            _this._authService.downloadUser();
            _this._growlService.addMessage("sucsess", "OK", "Subscription deleted");
        });
    };
    SubscriptionComponent.prototype.buyViews = function () {
        var _this = this;
        this._restService.get("buyviews", '').subscribe(function () {
            _this._authService.downloadUser();
            _this.displayBuyMoreViewsConfirmation = true; //delete ??
        });
    };
    SubscriptionComponent.prototype.openCheckout = function () {
        var component = this;
        component.stripeActive = true;
        var handler = window.StripeCheckout.configure({
            key: this._accountService.getConfig().stripeApiKey,
            locale: 'auto',
            closed: function () {
                component.stripeActive = false;
            },
            token: function (token) {
                component._restService.post("subscribe", token).subscribe(function () {
                    component.displayThanks = true;
                    component._growlService.addMessage("success", "Cool", "Subscription successful, enjoy!");
                }, function (err) {
                    if (err.status == '400') {
                        alert('Hey, the subscription was not successful, we are investigating. WILL DO ALERT NICELY');
                    }
                });
            }
        });
        handler.open({
            email: this._authService.user.email,
            allowRememberMe: false,
            name: 'AdSpy Monthly Subscription ' + this._accountService.getConfig().price,
            zipCode: true,
            image: "https://app.as-dev98706.club/assets/images/logo-only.png",
            //bitcoin: true,
            //currency: 'USD',
            description: 'subscribe to monthly payments'
        });
    };
    SubscriptionComponent.prototype.redirectToAds = function () {
        this._authService.setSubscriptionValid(true);
        this._authService.downloadUser();
        this._router.navigate(['/ads']); //should be inside callback
    };
    SubscriptionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._restService.getSingle("SubscriptionValid", {}).first().subscribe(function (valid) {
            _this.showSubscriptionInfo = !valid;
        });
    };
    SubscriptionComponent = __decorate([
        core_1.Component({
            selector: 'fb-subscription',
            templateUrl: './subscription.component.html',
            styleUrls: ['../account.scss']
        })
    ], SubscriptionComponent);
    return SubscriptionComponent;
}());
exports.SubscriptionComponent = SubscriptionComponent;
//# sourceMappingURL=subscription.component.js.map