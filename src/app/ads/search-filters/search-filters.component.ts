import {Component, OnInit, Input} from '@angular/core';
import {AdsLibService} from "../ads-lib.service";

@Component({
  selector: 'fb-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css']
})
export class SearchFiltersComponent implements OnInit {
  @Input()
  searches:string

  constructor(private _adsLibService:AdsLibService) {
  }

  getSearchParams() {
    //console.log('this.searches~~~',this.searches)

    if (this.searches) {
      var s = JSON.parse(this._adsLibService.deFancyfy(this.searches))
      //return this.searches
      return s;

    }
    else {
      return this._adsLibService.nonCurrentSearches();
    }
  }

  ngOnInit() {

  }

}
