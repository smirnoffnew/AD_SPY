import { Component, OnInit } from '@angular/core';
import {RestService} from "../../rest.service";
import {DataTableModule, SharedModule} from "primeng/primeng";

@Component({
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history:any;

  constructor(public _restService:RestService) { }

  getHistory(){
    this._restService.get("history").subscribe((history)=> {
      this.history = history;
    });
  }
  ngOnInit() {
    this.getHistory()
  }

}
