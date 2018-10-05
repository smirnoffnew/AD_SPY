import {Injectable} from '@angular/core';
import {RestService} from "../rest.service";
import {Router} from "@angular/router";

@Injectable()
export class AdsLibService {
  private _labels:any[] = [];
  public labels:any[] = [];

  constructor(public _restService:RestService, private router:Router) {

  }

  public affNetworks:any[]
  public searchQueries:any[] = [];
  public navFilters:any = {};

  public searchBoxes() {
    var cities = [];
    cities.push({label: 'Ad Text', type: 'texts'});
    cities.push({label: 'Comments', type: 'comments'});
    cities.push({label: 'Advertiser', type: 'advertisers'});
    cities.push({label: 'URL', type: 'urls'});
    cities.push({label: 'Landing Page URL', type: 'lp_urls'});
    cities.push({label: 'Country', type: 'countries', completer: true});
    return cities;
  }

  public searchBoxesForDd() {
    var t = this.searchBoxes().map(x=> {
      return {label: x.label, value: x.type}
    });
    return t;
  }

  public removeKey(key) {
    delete this.navFilters[key]
    this.router.navigate(['/ads', this.navFilters])
  }

  private _orderByLabels:any = [
    {value: 'created_on_desc', label: 'Date (recent on top)', ig: true},
    {value: 'created_on_asc', label: 'Date (oldest on top)', ig: true},
    {value: 'total_likes', label: 'Likes', ig: true},
    {value: 'total_loves', label: 'Love'},
    {value: 'total_hahas', label: 'Haha'},
    {value: 'total_wows', label: 'Wow'},
    {value: 'total_sads', label: 'Sad'},
    {value: 'total_angrys', label: 'Angry'},
    {value: 'total_shares', label: 'Shares'},
    {value: 'run_time', label: 'Longest running', ig: true},

  ];


  public  getOrderByLabels(siteType?:string) {
    //console.log('getOrderByLabels fired, siteType: ',siteType)
    if (siteType == 'Instagram') {
      var f = this._orderByLabels.filter(x=>x.ig);
      //console.log('_orderByLabels ',f)
      return f;
    }
    return this._orderByLabels;
  }

  public filterLabels:any = [
    {key: 'mediaType', label: 'Media type'},
    {key: 'dailyLikes', label: 'Daily likes', isArray: true, max: 1000},
    {key: 'totalLikes', label: 'Total likes', isArray: true, max: 100000},
    {key: 'ages', label: 'Age', isArray: true, max: 65},
    {key: 'siteType', label: 'Site Type'},
    {key: 'gender', label: 'Gender'},
    {key: 'seenAfter', label: 'Seen After'},
    {key: 'orderBy', label: 'Order By'},
    {key: 'texts', label: 'Ad Text'},
    {key: 'urls', label: 'URL'},
    {key: 'lp_urls', label: 'Landing Page URL'},
    {key: 'comments', label: 'Comments'},
    {key: 'countries', label: 'Country'},
    {key: 'advertisers', label: 'Advertiser'},
    {key: 'mediaType', label: 'Media Type'},
    {key: 'affNetwork', label: 'Affiliate Network'},
    {key: 'affId', label: 'Affiliate Id'},
    {key: 'offerId', label: 'Offer Id'},
    {key: 'label', label: 'Label'},

  ];

  getNavFiltersKeys(navFilters) {
    if (!navFilters)
      navFilters = this.navFilters;
    var copy = Object.assign({}, navFilters);
    delete copy.searches;
    delete copy.selectedValue;
    var navFiltersKeys = Object.keys(copy);
    return navFiltersKeys

  }

  public nonCurrentSearches() {
    return this.searchQueries.filter(p=>!p.current)
  }

  public getlabel(key:string):string {
    var o = this.filterLabels.find(f=>f.key == key)
    if (o)
      return o.label;
    return "not found key:" + key;
  }




  public fancyfy(str:string) {
    if (str)
      str = str.replace(/\[/g, "［").replace(/\]/g, "］").replace(/{/g, "｛").replace(/}/g, "｝").replace(/:/g, "˸")
        .replace(/ /g, " ").replace(/,/g, "，")
    return str;
  }


  public  deFancyfy(str:string) {
    if (str)
      str = str.replace(/［/g, "[").replace(/］/g, "]").replace(/｛/g, "{").replace(/｝/g, "}").replace(/˸/g, ":")
        .replace(/ /g, " ").replace(/，/g, ",")
    return str;
  }


  // getLabels() {
  //   return this._labels.map(x=> {
  //     return {'label': x, 'value': x}
  //   });
  // }

  downloadLabels() {
    this._restService.get("label").subscribe((labels)=> {
      this.labels = labels.map(x=> {
        return {'label': x, 'value': x}
      });
    });
  }
}
