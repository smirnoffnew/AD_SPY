"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var EditLabelsComponent = (function () {
    //labels:any[];
    function EditLabelsComponent(_adsLibService, _restService, _growlService) {
        this._adsLibService = _adsLibService;
        this._restService = _restService;
        this._growlService = _growlService;
        this.onLabelsChanged = new core_1.EventEmitter();
        this.onLabelDeleted = new core_1.EventEmitter();
    }
    EditLabelsComponent.prototype.saveLabel = function (label, editedLabel) {
        var _this = this;
        this._restService.put("label", { label: label.value, editedLabel: editedLabel }).subscribe(function (r) {
            _this._growlService.addMessage("success", "Label saved", "");
            _this._adsLibService.downloadLabels();
        });
    };
    EditLabelsComponent.prototype.delete = function (label) {
        var _this = this;
        this._growlService.addMessage("success", "Label deleted", "");
        this._restService.delete("label", label.value).subscribe(function (r) {
            //var index = this.labels.indexOf(label, 0);
            //this.labels.splice(index, 1);
            //this.onLabelsChanged.emit(this.labels);
            //this.alerts.success('Label deleted!');
            //this.onLabelDeleted.emit();
            _this._adsLibService.downloadLabels();
        });
    };
    EditLabelsComponent.prototype.ngOnInit = function () {
        //this.alerts.success('edit labels!' );
        //this.labels =this._adsLibService.getLabels();
    };
    EditLabelsComponent.prototype.ngOnDestroy = function () {
    };
    __decorate([
        core_1.Input()
    ], EditLabelsComponent.prototype, "labels");
    __decorate([
        core_1.Output()
    ], EditLabelsComponent.prototype, "onLabelsChanged");
    __decorate([
        core_1.Output()
    ], EditLabelsComponent.prototype, "onLabelDeleted");
    EditLabelsComponent = __decorate([
        core_1.Component({
            selector: 'fb-edit-labels',
            templateUrl: './edit-labels.component.html'
        })
    ], EditLabelsComponent);
    return EditLabelsComponent;
}());
exports.EditLabelsComponent = EditLabelsComponent;
//# sourceMappingURL=edit-labels.component.js.map