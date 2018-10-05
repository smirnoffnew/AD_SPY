import {Component, OnInit, AfterViewInit, Input, AfterContentInit} from '@angular/core';

import {environment} from "../../../environments/environment";
import {AdsLibService} from "../ads-lib.service";
import {RestService} from "../../rest.service";
import {GrowlService} from "../../growl.service";
declare var $:any;


@Component({
  selector: 'fb-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements AfterViewInit, AfterContentInit {


  @Input() ad:any;
  @Input() details:boolean;

  displayNewLabel:boolean;
  labelError:string;
  labelName:string;
  model = {};
  images:any[];

  constructor(private _adsLibService:AdsLibService,
              public _restService:RestService,
              public _growlService:GrowlService) {
  }


  actorLink(actor) {
    return this._adsLibService.fancyfy(JSON.stringify([{type: 'advertisers', value: actor.name, locked: false}]));
  }

  removeLabel(ad) {
    var label = ad.labelName
    ad.labelName = null;
    this._growlService.addMessage("success", "Label removed", "")

    this._restService.delete("changelabel", ad.id).subscribe(()=> {


    });
  }

  showMainAttachment() {
    //some weird bug Expression has changed after it was checked.
    setTimeout(()=> {
      this.ad.showMainAttachment = true;
    }, 10)
  }

  public onBugDialogClosed() {
    this.ad.displayReportBug = false;
  }

  changeLabel() {
    //ad.labelName = labelName;
    this._growlService.addMessage("success", "Label saved", "")
    this._restService.post("changelabel", {adId: this.ad.id, labelName: this.ad.labelName}).subscribe(()=> {
      this._adsLibService.downloadLabels()

    });
  }

  // onLabelsChanged(labels) {
  //   this.labels = labels;
  //   this.labelNames = labels.map(l => l.labelName);
  //   //this.searches.updateSearches();
  //   //last thing - to update URL if the label is selected
  //
  // }
  saveLabel() {
    this.displayNewLabel = false
    // alert(1)
    // this.labelError = "";
    // if (this.labelNames.indexOf(this.labelName) != -1) {
    //   this.labelError = "Label exists";
    //   return;
    // }
    //this.newLabel.close();
    // this._restService.post("label", {}).subscribe(r=> {
    //   this. _growlService.addMessage("success","Label added","")
    //   //this.model = {};
    //   //this.changingPassword = false;
    // });
    this.displayNewLabel = false;
    this._growlService.addMessage("success", "Label added", "")
    this._restService.post("label", {adId: this.ad.id, labelName: this.labelName.trim()}).subscribe(()=> {
        this.ad.labelName = this.labelName;
        this._adsLibService.downloadLabels();
        //this.labelNames.push(this.labelName)
        //this.labelAd.labelName = this.labelName;
        //this.labelName = null;
        // this._restService.get("label").subscribe((labels)=> {
        //   this.labels = labels;
        //   displayNewLabel=false
        // });
      }
    );

  }


  links:any;

  replaceHref() {
    this.links = $('a')
    for (var i = 0; i < this.links.length; i++) {
      var extHrefEl = $(this.links[i]).attr('exthref')
      if (extHrefEl) {
        var extHref = $(this.links[i]).attr('exthref')
        $(this.links[i]).attr('href', extHref);
        $(this.links[i]).click(function () {
          window.location.href = extHref;
        });
      }
    }

  }

  slickDone:boolean;

  initSlick() {
    if (!this.slickDone) {
      $(".slick" + this.ad.id).not('.slick-initialized').slick({
        //dots: true
      });
      this.slickDone = true;
    }
  }


  ngAfterViewInit() {
    if (this.details)
      this.replaceHref()
    this._adsLibService.downloadLabels()
    // if (this.ad.adType == 'Multi') {
    //   this.images = this.ad.subAttachments.map(x=>{return {source:x.imageUrl,alt:'Description for Image 1',title:'Title 1'}})
    // }
    //convert images


  }

  ngAfterContentInit() {
    setTimeout(() => {
        this.initSlick();
      },
      100
    )
  }


}
