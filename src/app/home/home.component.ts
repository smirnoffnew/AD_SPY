import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({

  template: ''

})
export class HomeComponent implements OnInit {

  constructor(public _authService:AuthService, private _router:Router) {

  }

  ngOnInit() {
    if (this._authService.getIsLoggedIn()) {
      this._router.navigate(['/ads']);
    }
    else{
      this._router.navigate(['/login']);
    }
  }


}
