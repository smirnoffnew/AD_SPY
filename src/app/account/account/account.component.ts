import { Component, OnInit } from '@angular/core';
import {SubscriptionComponent} from "../subscription/subscription.component";
import {InfoComponent} from "../info/info.component";
import {SecurityComponent} from "../security/security.component";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'fb-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css','../account.scss']
})
export class AccountComponent implements OnInit {

  constructor(private _authService:AuthService ) { }

  ngOnInit() {
    this._authService.downloadUser();
  }

}
