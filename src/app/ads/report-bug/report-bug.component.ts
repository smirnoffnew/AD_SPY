import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {RestService} from "../../rest.service";
import {GrowlService} from "../../growl.service";

@Component({
  selector: 'fb-report-bug',
  templateUrl: './report-bug.component.html',
  styleUrls: ['./report-bug.component.css']
})
export class ReportBugComponent implements OnInit {
  @Input() displayReportBug:boolean;
  @Input() adId:string;
  @Output() onBugDialogClosed = new EventEmitter<any>(true);
  issue:string

  constructor(public _restService:RestService, public _growlService:GrowlService) {
  }
  close() {
    this.onBugDialogClosed .emit();

  }
  submitBugReport(){
    this._growlService.addMessage("success", "Thanks, bug report submitted", "")
    this._restService.post("bugreport",{adId:this.adId,issue:this.issue}).subscribe()

    this.close();
  }



  ngOnInit() {
  }

}
