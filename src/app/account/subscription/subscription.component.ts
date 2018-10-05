import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";
import {RestService} from "../../rest.service";
import {SignalRService} from "../../signalR.service";
import {Router} from "@angular/router";
import {AccountService} from "../account.service";
import {GrowlService} from "../../growl.service";


@Component({
  selector: 'fb-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['../account.scss']
})
export class SubscriptionComponent {
  stripeActive:boolean;
  displayBuyMoreViews:boolean;
  displayBuyMoreViewsConfirmation:boolean;
  displayThanks:boolean;
  displayRemoveSubscription:boolean;
  showSubscriptionInfo:boolean = false;
  couponValid:boolean = true;
  coupon:string;
  enterCouponForm:any;

  constructor(public _authService:AuthService, private _growlService:GrowlService,
              public _accountService:AccountService, public _restService:RestService,
              private _router:Router) {
  }


  applyCoupon() {
    this._restService.get("applyCoupon", {couponId: this.coupon}).subscribe(()=> {
      this._authService.downloadUser();
      this._growlService.addMessage("success", "Cool", "Coupon applied, enjoy!")
      this.coupon = null;
    });
  }

  cancelSubscription() {
    this._restService.delete("subscribe", '').subscribe(()=> {
      this._authService.removeStripeCustomerName();
      this._authService.downloadUser();
      this._growlService.addMessage("sucsess", "OK", "Subscription deleted")

    });
  }


  buyViews() {
    this._restService.get("buyviews", '').subscribe(()=> {
      this._authService.downloadUser();
      this.displayBuyMoreViewsConfirmation = true; //delete ??
    });
  }


  key:string;

  openCheckout() {
    var component = this;
    component.stripeActive = true;
    var handler = (<any>window).StripeCheckout.configure({
      key: this._accountService.getConfig().stripeApiKey,
      locale: 'auto',
      closed: function () {
        component.stripeActive = false;
      },
      token: function (token:any) {
        component._restService.post("subscribe", token).subscribe(()=> {
          component.displayThanks = true;
          component._growlService.addMessage("success", "Cool", "Subscription successful, enjoy!")

        }, err => {
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
      description: 'subscribe to monthly payments',
      //billingAddress:true,
    });
  }

  redirectToAds() {
    this._authService.setSubscriptionValid(true);
    this._authService.downloadUser();
    this._router.navigate(['/ads']); //should be inside callback

  }


  ngOnInit() {
    this._restService.getSingle("SubscriptionValid", {}).first().subscribe(valid=> {
      this.showSubscriptionInfo = !valid;
    });
  }

}
