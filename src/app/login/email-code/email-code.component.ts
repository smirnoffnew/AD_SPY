import {Component, OnInit, OnDestroy}   from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute}      from '@angular/router';
import {AuthService} from '../../auth.service';
import {RestService} from "../../rest.service";
import {Subscription} from "rxjs/Rx";

@Component({
  template: ''
})
export class EmailCodeComponent implements OnInit {
  model = {}

  constructor(public _authService:AuthService, private _router:Router, private _route:ActivatedRoute,
              public _restService:RestService) {
    _authService.errorMessage = "";
  }


  done:boolean;
  subscription:Subscription;

  confirmEmail(){

  }

  ngOnInit() {
    let params:any = this._route.snapshot.params;
    let code = params.code;
    this._restService.get("ConfirmEmail", {code: code}).subscribe(()=> {
      //alert(1)
      this._authService.setEmailConfirmed();
      if (!this.done) {
        this._router.navigate(["ads"]);
        this.done = true;
      }


    })//,;


    // this.subscription = this._router.events
    //   .subscribe((event) => {
    //     if (event instanceof NavigationEnd) {
    //
    //     }
    //   });
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

}

