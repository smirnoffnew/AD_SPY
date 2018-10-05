import {Component, OnChanges, Input} from '@angular/core';
import {AdsLibService} from "../ads-lib.service";
import {Router} from "@angular/router";

@Component({
  selector: 'fb-nav-filters',
  templateUrl: './nav-filters.component.html',
  styleUrls: ['./nav-filters.component.css']
})
export class NavFiltersComponent {
  @Input()
  showClose:boolean;
  @Input()
  filters:any;

  constructor(private _adsLibService:AdsLibService) {
  }

  get1() {
    return this.filters
  }


  public constructLabel(key:string, filters:any):string {
    var filterLabel = this._adsLibService.filterLabels.find(f=>f.key == key);
    if (!filterLabel)
      return "";
    var keys = Object.keys(filters);
    var filterKey = keys.find(k=>k == key);
    var value = filters[key];

    var totalLabel = filterLabel.label + ": ";
    if (filterLabel.isArray) {
      var arr = JSON.parse(this._adsLibService.deFancyfy(value));
      if (!arr [1]) {
        totalLabel += 'from ' + arr[0].toLocaleString() + ' to ' + filterLabel.max.toLocaleString() + "+";
      }
      // var isRightMax = !arr [1] || arr [1] == filterLabel.max;
      // if (isRightMax) {
      //   totalLabel += arr[0] + '+';
      // }
      else {
        totalLabel += 'from ' + arr[0].toLocaleString() + ' to ' + arr [1].toLocaleString();
      }

    }
    else {
      if (key == 'orderBy') {
        totalLabel += this._adsLibService.getOrderByLabels().find(l=>l.value == value).label;
      }
      else if (key == 'affNetwork' && this._adsLibService.affNetworks) {
        totalLabel += this._adsLibService.affNetworks.filter(a=>a.value == value)[0].label;
        //totalLabel += this.affNetworks[0].name
      }
      else {
        totalLabel += value;
      }

    }

    return totalLabel;
  }


  getKeys() {

    var keys = this._adsLibService.getNavFiltersKeys(this.filters)
    //console.log("keys ~~~:",keys )
    return keys;
    //console.log(this.filters)
    // if (this.filters) {
    //   return this._adsLibService.getNavFiltersKeys(this.filters)
    // }
    // else {
    //   return this._adsLibService.getNavFiltersKeys()
    //
    // }
  }

  getFilters() {
    if (this.filters)
      return this.filters
    return this._adsLibService.navFilters
  }


  // ngOnChanges() {
  //   if (!this.filters)
  //     this.filters = this._adsLibService.navFilters
  // }


}
