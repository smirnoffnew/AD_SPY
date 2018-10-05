import {Component,OnInit} from '@angular/core';
@Component({
  selector: 'fb-loading-ads',
  templateUrl: './loading-ads.component.html',
  styleUrls: ['loading-ads.component.css']

})

export class LoadingAdsComponent implements OnInit {
  times = []

  init() {

    for (var i = 0; i <= 1; i++) {
      this.times.push(i);
    }

  }

  ngOnInit() {
    this.init();
  }
}
