import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartModule, UIChart} from 'primeng/primeng';
import {RestService} from "../../rest.service";
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'fb-trends-chart',
  templateUrl: './trends-chart.component.html',
  styleUrls: ['./trends-chart.component.css']
})
export class TrendsChartComponent implements OnInit {
   @ViewChild('chart')
   chart:UIChart;
  data:any;

  constructor(public _restService:RestService) {

  }

  public getChart(ajaxParams):void {
    this._restService.get("adtrend", ajaxParams).subscribe((data:any) => {
      let labels = _.map(data, (item:any) => {
        return moment(Date.parse(item.x)).format("DD MMM");
      });


      console.log('labels', labels)
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
          label: 'Ad trend',
          data: _.map(data, (item:any) => {
            return item.y;
          }),
          fill: true,
          borderColor: '#4bc0c0'
        }]
      }
      setTimeout(()=> {
         this.chart.reinit();
      }, 100);

    });
  }

  ngOnInit() {
  }

}
