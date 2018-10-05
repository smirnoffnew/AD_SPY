import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RestService} from "../../rest.service";
import * as _ from 'lodash';
import * as moment from 'moment';
import {UIChart, DataTableModule, SharedModule} from "primeng/primeng";
declare var $:any;

import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit,AfterViewInit {
  @ViewChild('chart')
  chart:UIChart;
  @ViewChild('genderChart')
  genderChart:UIChart;
  @ViewChild('countryChart')
  countryChart:UIChart;
  @ViewChild('ageChart')
  ageChart:UIChart;



  //images:any[] = [];


  id:any;
  ad:any;
  data:any;
  genderData:any;
  countryData:any;
  ageData:any;

  constructor(public _restService:RestService,
              private _router:Router,
              private _route:ActivatedRoute) {

  }

  backgroundColors = [    "#3366CC","#DC3912","#FF9900","#109618","#990099","#3B3EAC","#0099C6","#DD4477","#66AA00","#B82E2E","#316395","#994499","#22AA99","#AAAA11","#6633CC","#E67300","#8B0707","#329262","#5574A6","#3B3EAC"  ];
  techStack:any;

  loadAd() {
    this._restService.get("ad", {id: this.id, dummy: true}).subscribe((ad)=> {
      this.ad = ad;
      //this.techStack = ad.techstack;
      //console.log(this.techStack)
      this.genderData = {
        labels: ad.genderStats.map((x)=>x.key ? x.key : 'Unknown'),
        datasets: [
          {
            data: ad.genderStats.map((x)=>x.count),
            backgroundColor: this.backgroundColors,
          }]
      };
      this.countryData = {
        labels: ad.countryStats.map((x)=>x.key ? x.key : 'Unknown'),
        datasets: [
          {
            data: ad.countryStats.map((x)=>x.count),
            backgroundColor: this.backgroundColors,
          }]
      };
      this.ageData = {
        labels: ad.ageStats.map((x)=>x.key + ' - ' + (parseInt(x.key) + 10)),
        datasets: [
          {
            data: ad.ageStats.map((x)=>x.count),
            backgroundColor: this.backgroundColors,
          }]
      };
    });
  }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this.loadAd();
    this.getChart();
  }

  ngAfterViewInit() {
  }
  public getChart():void {
    this._restService.get("likes", {id: this.id}).subscribe((resp:any) => {

      if(resp.length == 1)
        return;
      let labels = _.map(resp, (item:any) => {
        return moment(Date.parse(item.takenOn)).format("DD MMM");
      });
      this.data = {
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                displayFormats: {
                  'millisecond': 'MMM DD',
                  'second': 'MMM DD',
                  'minute': 'MMM DD',
                  'hour': 'MMM DD',
                  'day': 'MMM DD',
                  'week': 'MMM DD',
                  'month': 'MMM DD',
                  'quarter': 'MMM DD',
                  'year': 'MMM DD',
                }
              }
            }]
          }
        },
        labels: labels,
        datasets: [{
          label: 'Likes over time',
          data: _.map(resp, (item:any) => {
            return item.likeNum;
          }),
          fill: true,
          borderColor: '#4bc0c0'
        }]
      };
      setTimeout(()=> {
        if(this.chart)
          this.chart.reinit();
      }, 300);
    });
  }
}
