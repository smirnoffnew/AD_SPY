import {Component, OnInit, ViewChild}   from '@angular/core';
import {Router, ActivatedRoute}      from '@angular/router';
import {AuthService} from '../../auth.service';
import {RestService} from "../../rest.service";
import {Http} from "@angular/http";
import {FormControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import {LibService} from "../../lib.service";

declare var $:any;

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  @ViewChild('regForm') regForm;
  allowed:boolean = true;
  aff:string;

  ngAfterViewInit() {
    this.setUserNameCheck()
  }

  setUserNameCheck() {
    this.regForm.control.valueChanges.debounceTime(500).distinctUntilChanged()
      .subscribe(values =>
        this.checkUserName(values.userName)
      );
  }

  model:any = {};

  constructor(public _restService:RestService, public _libService:LibService,   private _router:Router, private _http:Http, public _authService:AuthService, private _activatedRoute:ActivatedRoute) {

  }


  checkUserName(e) {
    if (!e)
      return;
    this._restService.get("register", {id: e.trim()}).subscribe((x)=> {
      this.allowed = x;
      console.log(x)
    })

  }

  register() {
    this.model.aff = this._activatedRoute.snapshot.queryParams.aff;
    this._restService.post("register", this.model).subscribe(r=> {
      //this.model.grant_type = 'password';

      this._authService.login(this.model).subscribe((data)=> {
        localStorage.setItem("auth_token", data.access_token);
        this._router.navigate(['verify-email']);

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
  }

  ngOnInit() {
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
  }

}
