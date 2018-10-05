import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import {RestService} from "../../rest.service";
import {Location} from '@angular/common';
import * as moment from 'moment';
import {Subscription} from "rxjs/Rx";
import {AdsLibService} from "../ads-lib.service";

@Component({
  selector: 'fb-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, OnDestroy {
  affId:any;
  countryMatches:string[];

  searchCountry(event) {
    this.countryMatches = this.countries
      .filter(x=>x.name.toLowerCase().includes(event.query.toLowerCase())).map(x=>x.name);
  }


  @Output() onNavFiltersReady = new EventEmitter<any>(true);

  //private countryDataService:CompleterData;
  country:string;
  searchBoxes:any[] = [];
  countries:any[] = [];
  orders:any;
  labels:any[] = []
  filtersReady:boolean
  subscription:Subscription;
  filters:any = {};
  seenAfterDate:Date;
  dd:any;
  overlays:any[] = [];
  navFiltersKeys:string[] = [];

  constructor(public _restService:RestService, private router:Router, private route:ActivatedRoute,
              //private completerService:CompleterService,
              private _location:Location, private _adsLibService:AdsLibService) {

  }

  wasCleared:boolean;

  clearAll() {
    this.filters = {};
    this.initFilters();
    this.updateUrl();
  }

  undo() {
    this.wasCleared = false;
    this._location.back();
  }

  countrySelected() {
    var match = this.countries.find(c=>c.name == this.country);
    if (!match)
      return;

    this._adsLibService.searchQueries.push({type: 'countries', value: this.country, locked: false});

    setTimeout(() => {
      this.country = null;
    }, 100);
    this.updateUrl();
  }

  search() {
    var current = this._adsLibService.searchQueries.find(p=>p.type == this.filters.selectedValue && p.current);
    var value = this.searchBoxes.find(s=>s.type == this.filters.selectedValue).value;
    if (current) {
      current.value = value;
    }
    else {
      this._adsLibService.searchQueries.push({type: this.filters.selectedValue, value: value, current: true});
    }
    this.updateUrl();
  }


  removeParam(param) {
    this._adsLibService.searchQueries = this._adsLibService.searchQueries.filter(p=> {
      return p.type != param.type || p.value != param.value
    });
    this.updateUrl();
  }

  addCurrentToParams() {
    var value = this.searchBoxes.find(s=>s.type == this.filters.selectedValue).value;
    this.removeParam({type: this.filters.selectedValue, value: value});//remove current
    this._adsLibService.searchQueries.push({type: this.filters.selectedValue, value: value, locked: false});
    this.updateUrl();

  }

  disablePreview() {
    var targetBox = this.searchBoxes.find(s=>s.type == this.filters.selectedValue);
    if (targetBox && targetBox.value)
      return false;
    return true;
  }

  disableAdd() {
    var targetBox = this.searchBoxes.find(s=>s.type == this.filters.selectedValue);
    var targetParam = this._adsLibService.searchQueries.find(s=>s.current && s.type == this.filters.selectedValue);
    if (targetBox && targetParam && targetBox.value == targetParam.value)
      return false;
    return true;

  }

  onSelectChange() {
    for (let searchBox of this.searchBoxes) {
      searchBox.value = '';
    }
    this._adsLibService.searchQueries = this._adsLibService.searchQueries.filter(p=>!p.current);
    //this.updateUrl();
  }

  ageChange() {
    this.filters.fromAge = this.filters.ages[0];
    this.filters.toAge = this.filters.ages[1];
    this.updateUrl();
  }

  boxesWithValueNum() {
    return this._adsLibService.searchQueries.filter(b=>b.current && b.value).length;
  }


  toggle(el, $event) {
    this.overlays.forEach(x=> {
      if (x.id != el.id) {
        if (x.isOpen) {
          x.hide(x.$event);
          //x.isOpen = null
        }
      }

    });
    el.toggle($event);
    //el.isOpen = !el.isOpen
    var e = this.overlays.find(x=>x.id == el.id)
    if (!e) {
      el.id = new Date().getTime();
      el.$event = $event;
      this.overlays.push(el);
    }


  }

  initSearchBoxes() {
    this.dd = this._adsLibService.searchBoxesForDd();
    this.searchBoxes = this._adsLibService.searchBoxes();

    for (let box of this.searchBoxes) {
      var filter = this._adsLibService.searchQueries.find(f=>f.type == box.type && f.current);
      if (filter) {
        box.value = filter.value
      }
      else {
        box.value = '';
      }
    }
  }


  clearFilters() {
    this.wasCleared = true;
    this.filters = {};
    this.router.navigate(['/ads']);
  }


  constructNonDefaltFilters():any {
    var ajaxFilters:any = {};
    var navFilters:any = {};
    //this._adsLibService.navFilters = {};
    if (this.seenAfterDate) {
      navFilters.seenAfter = moment(this.seenAfterDate).format('DD-MMM-YYYY');
      ajaxFilters.seenAfter = this.seenAfterDate;
    }

    if ((this.filters.ages[0] != 18 || this.filters.ages[1] != 65)) {
      var ages = this.filters.ages.slice(); //clone
      if (ages[1] == 65)
        ages.splice(1, 1);
      navFilters.ages = this._adsLibService.fancyfy(JSON.stringify(ages))
      ajaxFilters.ages = ages;
    }

    if ((this.filters.dailyLikes[0] != 0 || this.filters.dailyLikes[1] != 1000)) {
      var dailyLikes = this.filters.dailyLikes.slice(); //clone
      if (dailyLikes[1] == 1000)
        dailyLikes.splice(1, 1);
      navFilters.dailyLikes = this._adsLibService.fancyfy(JSON.stringify(dailyLikes))
      ajaxFilters.dailyLikes = dailyLikes;
    }


    if ((this.filters.totalLikes[0] != 0 || this.filters.totalLikes[1] != 100000)) {
      var totalLikes = this.filters.totalLikes.slice(); //clone
      if (totalLikes[1] == 100000)
        totalLikes.splice(1, 1);
      navFilters.totalLikes = this._adsLibService.fancyfy(JSON.stringify(totalLikes))
      ajaxFilters.totalLikes = totalLikes;
    }

    if (this.filters.siteType != 'all') {
      navFilters.siteType = this.filters.siteType;
      ajaxFilters.siteType = this.filters.siteType;
    }

    if (this.filters.gender != 'all') {
      navFilters.gender = this.filters.gender;
      ajaxFilters.gender = this.filters.gender;
    }
    if (this.filters.mediaType != 'all') {
      navFilters.mediaType = this.filters.mediaType;
      ajaxFilters.mediaType = this.filters.mediaType;
    }
    if (this.filters.orderBy != 'created_on_desc') {
      navFilters.orderBy = this.filters.orderBy;
      ajaxFilters.orderBy = this.filters.orderBy;
    }

    if (this.filters.label) {
      navFilters.label = this.filters.label;
      ajaxFilters.label = this.filters.label;
    }

    if (this._adsLibService.searchQueries.length > 0) {
      navFilters.searches = this._adsLibService.fancyfy(JSON.stringify(this._adsLibService.searchQueries));
      ajaxFilters.searches = this._adsLibService.searchQueries;
    }
    if (this.filters.selectedValue != 'texts') {
      navFilters.selectedValue = this.filters.selectedValue;
      ajaxFilters.selectedValue = this.filters.selectedValue;
    }

    if (this.filters.affNetwork) {
      navFilters.affNetwork = this.filters.affNetwork;
      ajaxFilters.affNetwork = this.filters.affNetwork;
    }

    if (this.filters.affId) {
      navFilters.affId = this.filters.affId;
      ajaxFilters.affId = this.filters.affId;
    }
    if (this.filters.offerId) {
      navFilters.offerId = this.filters.offerId;
      ajaxFilters.offerId = this.filters.offerId;
    }

    if (this.filters.label) {
      navFilters.label = this.filters.label;
      ajaxFilters.label = this.filters.label;
    }


    return {navFilters, ajaxFilters};


  }


  onSiteTypeChange(e):void {
    this.orders = this._adsLibService.getOrderByLabels(this.filters.siteType)
    this.filters.ortderBy = this.orders[0].key;
    setTimeout(()=> {
      this.updateUrl()
    }, 100)


  }

  updateUrl():void {
    this.wasCleared = false;
    this._adsLibService.navFilters = this.constructNonDefaltFilters().navFilters;

    //this._adsLibService.navFiltersKeys = Object.keys(navFilters); //duplicate with nav-filters


    this.router.navigate(['/ads', this._adsLibService.navFilters]);
  }

  initFilters() {

    var navParams:any = Object.assign({}, this.route.snapshot.params);

    //selectedValue
    this.filters.selectedValue = navParams.selectedValue ? navParams.selectedValue : "texts";

    //searchQueries
    if (navParams.searches) {
      this._adsLibService.searchQueries = JSON.parse(this._adsLibService.deFancyfy(navParams.searches))
    }
    else {
      this._adsLibService.searchQueries = [];
    }

    //ages
    if (navParams.ages) {
      this.filters.ages = JSON.parse(this._adsLibService.deFancyfy(navParams.ages))
      if (this.filters.ages.length == 1) {
        this.filters.ages = [this.filters.ages[0], 65]
      }
    }
    else {
      this.filters.ages = [18, 65];
    }

    //siteType
    if (!navParams.siteType) {
      this.filters.siteType = "all"
    }
    else {
      this.filters.siteType = navParams.siteType;
    }

    //gender
    if (!navParams.gender) {
      this.filters.gender = "all"
    }
    else {
      this.filters.gender = navParams.gender;
    }

    //orderBy
    if (!navParams.orderBy) {
      this.filters.orderBy = "created_on_desc"
    }
    else {
      this.filters.orderBy = navParams.orderBy;
    }

    //mediaType
    if (!navParams.mediaType) {
      this.filters.mediaType = "all"
    }
    else {
      this.filters.mediaType = navParams.mediaType;
    }


    if (navParams.dailyLikes) {
      this.filters.dailyLikes = JSON.parse(this._adsLibService.deFancyfy(navParams.dailyLikes))
      if (this.filters.dailyLikes.length == 1) {
        this.filters.dailyLikes = [this.filters.dailyLikes[0], 1000]
      }
    }
    else {
      this.filters.dailyLikes = [0, 1000];
    }

    if (navParams.totalLikes) {
      this.filters.totalLikes = JSON.parse(this._adsLibService.deFancyfy(navParams.totalLikes))
      if (this.filters.totalLikes.length == 1) {
        this.filters.totalLikes = [this.filters.totalLikes[0], 100000]
      }
    }
    else {
      this.filters.totalLikes = [0, 100000];
    }


    if (navParams.affNetwork) {
      this.filters.affNetwork = navParams.affNetwork;
    }

    // if (!navParams.affNetwork) {
    //   this.filters.affNetwork = "all"
    // }
    // else {
    //   this.filters.affNetwork = navParams.affNetwork;
    // }

    this.filters.affId = navParams.affId;
    this.filters.offerId = navParams.offerId;
    this.filters.label = navParams.label;


    this.seenAfterDate = navParams.seenAfter;


    this.initSearchBoxes();

    this._restService.get("UserCountry").subscribe(countries=> {
      this.countries = countries;
      //this.countryDataService = this.completerService.local(this.countries, 'name', 'name');
    });

    var filters = this.constructNonDefaltFilters();
    this._adsLibService.navFilters = filters.navFilters;
    var ajaxFilters = filters.ajaxFilters;

    this.onNavFiltersReady.emit(ajaxFilters);
  }

  getAffNetworks() {
    this._restService.get("affNetwork").subscribe(affNetworks=> {
      console.log('affNetworks', affNetworks)
      this._adsLibService.affNetworks = affNetworks.map(x=> {
        return {'label': x.name, 'value': x.id}
      });
      ;
      //this.labels=labels
      // can use same principle for labels
      this.filtersReady = true;

    });
  }


  loadPage() {
    this.initFilters();
    this.getAffNetworks();
    this.orders = this._adsLibService.getOrderByLabels(this.filters.siteType)
  }

  ngOnInit() {

    this.loadPage();
    this.subscription = this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.loadPage()
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
