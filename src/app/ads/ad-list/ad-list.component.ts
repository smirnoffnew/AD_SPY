import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
//import {CompleterService, CompleterData} from 'ng2-completer';
import {RestService} from "../../rest.service";
import {Subscription}   from 'rxjs/Subscription';
import {environment} from "../../../environments/environment";
//import {SearchesComponent} from "../search/searches.component";
//import {LoadingAdsComponent} from "../loading-ads/loading-ads.component";
import * as _ from 'lodash';
import {GrowlService} from "../../growl.service";
//import * as moment from 'moment';
//import {PanelComponent} from "../panel/panel.component";
//import {TrendsChartComponent} from "../trends-chart/trends-chart.component";

declare var $:any;


@Component({
  templateUrl: './ad-list.component.html',
  styleUrls: ['ad-list.component.css']
})

export class AdListComponent {

  //@ViewChild('trendsChart')
  //trendsChart:TrendsChartComponent;

  throttle = 300;
  scrollDistance = 20;
  ads:any [] = [];
  errorMessage:string;
  loadingAds:boolean;
  emptyResult:boolean;
  //currentParams:any = {};
  currentParams:any[] = [];
  //private actorDataService:CompleterData;
  //private countryDataService:CompleterData;
  labelNames:string[];
  //labels:Array<Object>;
  labelError;
  subscription:Subscription;
  labelAd; //ad being labeled
  labelName; //the new label that is created

  page:number;
  ajaxFilters:any;

  onScrollDown() {
    if (!this.page)
      this.page = 1;
    else
      this.page++;
    this.loadAds(true);
  }


  constructor(public _restService:RestService, private router:Router, private route:ActivatedRoute, private _growlService:GrowlService)
  //private completerService:CompleterService
  {
    //this.actorDataService = completerService.remote(environment.apiUrl + "actor/", 'name', 'name');
    //this.countryDataService = completerService.remote(environment.apiUrl + "userCountry/", 'name', 'name');
  }

  onNavFiltersReady(ajaxFilters:any) {
    console.log("onNavFiltersReady received");
    this.ajaxFilters = ajaxFilters;
    this.loadAds();
  }

  loadAds(isScroll:boolean = false):void {
    this.loadingAds = true;

    if (!isScroll) {
      this.page = null;
      this.ads = [];
      delete this.emptyResult;
    }
    else if (this.ads.length == 0) {
      return;
    }
    this.ajaxFilters.page = this.page;

    if (!isScroll) {
      //this.trendsChart.getChart(this.ajaxFilters);
    }

    this._restService.get("ad", this.ajaxFilters).subscribe(ads => {
        this.showAds(ads)
      }, x=> {
        if (x.status == 417) {
          this._growlService.addMessage("warn", "Please buy more views", '')
          setTimeout(()=> {
            this.router.navigate(['/account']);
          }, 500)
        }

      }
    )
  }


  showAds(ads):void {
    if (ads != null) {
      this.ads = this.ads.concat(ads.data);
      //this.labels = ads.labels;
      //this.labelNames = ads.labels.map(l => l.labelName);
    }
    if (this.ads.length == 0) {
      this.emptyResult = true;
    }
    this.loadingAds = false;
  }


  changeLabel(labelName, ad) {
    ad.labelName = labelName;
    this._restService.post("changelabel", {adId: ad.id, labelName: labelName}).subscribe(()=> {

    });
  }


  openNewLabel(ad) {
    this.labelAd = ad;
  }


  //onLabelsChanged(labels) {
    //this.labels = labels;
    //this.labelNames = labels.map(l => l.labelName);


  //}

  onLabelDeleted() {
    //this.searches.updateSearches();
  }


}
