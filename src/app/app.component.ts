import {Component, AfterViewInit, ElementRef, Renderer, ViewChild, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";
import {SignalRService} from "./signalR.service";
import {GrowlModule} from 'primeng/primeng';
import {GrowlService} from "./growl.service";
import {AdsLibService} from "./ads/ads-lib.service";

@Component({

  selector: 'pm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  sidebarActive:boolean;
  overlay:boolean;

  constructor(public _authService:AuthService, public _growlService:GrowlService,private _adsLibService:AdsLibService
              //public toastr:ToastsManager, vRef:ViewContainerRef
  ) {
    //this.toastr.setRootViewContainerRef(vRef);
  }
  slides:any = [
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"}
  ];
  slideConfig:any = {"slidesToShow": 4, "slidesToScroll": 4};
  afterChange(e) {
    console.log('afterChange');
  }

  ngOnInit() {
    this._authService.downloadUser();
    if(this._authService.getIsLoggedIn()) {
      this._adsLibService.downloadLabels();
    }
  }
}
