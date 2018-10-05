import {Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from "../../rest.service";
import 'rxjs/add/operator/map';
import {ActivatedRoute, Router, NavigationEnd} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {GrowlService} from "../../growl.service";
import {AdsLibService} from "../ads-lib.service";

declare var $:any;

@Component({
  selector: 'fb-searches',
  templateUrl: './searches.component.html',
  styleUrls: ['./searches.component.css']

})

export class SearchesComponent implements OnInit {
  displayEditSearches:boolean;
  displayNewSearch:boolean;

  constructor(public _restService:RestService, private _adsLibService:AdsLibService,public _growlService:GrowlService, private _router:Router,
              private _route:ActivatedRoute) {
  }

  searchName:string;
  searchId;

  selectedSearch = 0;

  loadSearch(id) {
    var search = this.searches.find(s=>s.id == id);
    if (search) {

      this._router.navigate(['/ads', search.params])
    }

  }

  saveSearch() {
    this._growlService.addMessage("success", "Search saved", "")

    this._restService.post("search", {
      searchName: this.searchName,
      searchParams: this._route.snapshot.params,
      //searches:this._adsLibService.nonCurrentSearches()
    }).subscribe(r=> {
      this.searchName = null;
      //this.alerts.push({msg: 'Search saved!', type: 'success', closable: true});
      this.updateSearches();
    });
  }

  searches;
  searchesDd;
  updateSearches() {
    this._restService.get("search").subscribe(searches=> {

      this.searches = searches;
      this.searchesDd = [{'label':'Select Search','value':'select'},...searches];
      //this.searches = [...searches];
      console.log("searches~~",searches)

    });
  }

  delete(search) {
    this._restService.delete("search", search.id).subscribe(()=> {
      this.updateSearches();
      //this.alerts.push({msg: 'Search deleted!', type: 'success', closable: true});
    });
  }


  subscription:Subscription;
  params:any[];

  hasParams() {
    return Object.keys(this._route.snapshot.params).length>0

  }

  ngOnInit() {
    this.updateSearches();
    this.subscription = this._router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          //this.params = Object.keys(this._route.snapshot.params)
        }
      });
  }

  // public closeAlert(i:number):void {
  //   this.alerts.splice(i, 1);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
