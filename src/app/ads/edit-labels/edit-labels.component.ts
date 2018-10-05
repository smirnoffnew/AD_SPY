import {Component, Input, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {RestService} from "../../rest.service";
import {DialogModule} from 'primeng/primeng';
import 'rxjs/add/operator/map';
import {AdsLibService} from "../ads-lib.service";
import {GrowlService} from "../../growl.service";



declare var $:any;

@Component({
  selector: 'fb-edit-labels',
  templateUrl: './edit-labels.component.html',
})

export class EditLabelsComponent implements OnInit {
  @Input() labels:Array<Object>;
  @Output() onLabelsChanged = new EventEmitter<any>();
  @Output() onLabelDeleted = new EventEmitter<any>();

  // @ViewChild('modal')
  // modal:ModalComponent;
  //
  // @ViewChild('alerts')
  // alerts:AlertComponent;
  editedLabel:string;
  displayEditLabel:boolean;
  deletedLabel:any;

  //labels:any[];

  constructor(public _adsLibService:AdsLibService,public _restService:RestService, public _growlService:GrowlService) {

  }


  private saveLabel(label,editedLabel) {

    this._restService.put("label", {label:label.value,editedLabel:editedLabel}).subscribe(r=> {
      this._growlService.addMessage("success", "Label saved", "")
      this._adsLibService.downloadLabels()
    });
  }

  private delete(label) {

    this._growlService.addMessage("success", "Label deleted", "")

    this._restService.delete("label", label.value).subscribe(r=> {
      //var index = this.labels.indexOf(label, 0);
      //this.labels.splice(index, 1);
      //this.onLabelsChanged.emit(this.labels);
      //this.alerts.success('Label deleted!');
      //this.onLabelDeleted.emit();
      this._adsLibService.downloadLabels()
    });
  }

  ngOnInit() {
    //this.alerts.success('edit labels!' );
    //this.labels =this._adsLibService.getLabels();
  }


  ngOnDestroy() {
  }
}
