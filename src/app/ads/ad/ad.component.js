"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AdComponent = (function () {
    function AdComponent(_adsLibService, _restService, _growlService) {
        this._adsLibService = _adsLibService;
        this._restService = _restService;
        this._growlService = _growlService;
        this.model = {};
    }
    AdComponent.prototype.actorLink = function (actor) {
        return this._adsLibService.fancyfy(JSON.stringify([{ type: 'advertisers', value: actor.name, locked: false }]));
    };
    AdComponent.prototype.removeLabel = function (ad) {
        var label = ad.labelName;
        ad.labelName = null;
        this._growlService.addMessage("success", "Label removed", "");
        this._restService.delete("changelabel", ad.id).subscribe(function () {
        });
    };
    AdComponent.prototype.showMainAttachment = function () {
        var _this = this;
        //some weird bug Expression has changed after it was checked.
        setTimeout(function () {
            _this.ad.showMainAttachment = true;
        }, 10);
    };
    AdComponent.prototype.onBugDialogClosed = function () {
        this.ad.displayReportBug = false;
    };
    AdComponent.prototype.changeLabel = function () {
        var _this = this;
        //ad.labelName = labelName;
        this._growlService.addMessage("success", "Label saved", "");
        this._restService.post("changelabel", { adId: this.ad.id, labelName: this.ad.labelName }).subscribe(function () {
            _this._adsLibService.downloadLabels();
        });
    };
    // onLabelsChanged(labels) {
    //   this.labels = labels;
    //   this.labelNames = labels.map(l => l.labelName);
    //   //this.searches.updateSearches();
    //   //last thing - to update URL if the label is selected
    //
    // }
    AdComponent.prototype.saveLabel = function () {
        var _this = this;
        this.displayNewLabel = false;
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
        this._growlService.addMessage("success", "Label added", "");
        this._restService.post("label", { adId: this.ad.id, labelName: this.labelName.trim() }).subscribe(function () {
            _this.ad.labelName = _this.labelName;
            _this._adsLibService.downloadLabels();
            //this.labelNames.push(this.labelName)
            //this.labelAd.labelName = this.labelName;
            //this.labelName = null;
            // this._restService.get("label").subscribe((labels)=> {
            //   this.labels = labels;
            //   displayNewLabel=false
            // });
        });
    };
    AdComponent.prototype.replaceHref = function () {
        this.links = $('a');
        for (var i = 0; i < this.links.length; i++) {
            var extHrefEl = $(this.links[i]).attr('exthref');
            if (extHrefEl) {
                var extHref = $(this.links[i]).attr('exthref');
                $(this.links[i]).attr('href', extHref);
                $(this.links[i]).click(function () {
                    window.location.href = extHref;
                });
            }
        }
    };
    AdComponent.prototype.initSlick = function () {
        if (!this.slickDone) {
            $(".slick" + this.ad.id).not('.slick-initialized').slick({});
            this.slickDone = true;
        }
    };
    AdComponent.prototype.ngAfterViewInit = function () {
        if (this.details)
            this.replaceHref();
        this._adsLibService.downloadLabels();
        // if (this.ad.adType == 'Multi') {
        //   this.images = this.ad.subAttachments.map(x=>{return {source:x.imageUrl,alt:'Description for Image 1',title:'Title 1'}})
        // }
        //convert images
    };
    AdComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initSlick();
        }, 100);
    };
    __decorate([
        core_1.Input()
    ], AdComponent.prototype, "ad");
    __decorate([
        core_1.Input()
    ], AdComponent.prototype, "details");
    AdComponent = __decorate([
        core_1.Component({
            selector: 'fb-ad',
            templateUrl: './ad.component.html',
            styleUrls: ['./ad.component.css']
        })
    ], AdComponent);
    return AdComponent;
}());
exports.AdComponent = AdComponent;
//# sourceMappingURL=ad.component.js.map