"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var NewTicketComponent = (function () {
    function NewTicketComponent(_growlService, _restService, _router) {
        this._growlService = _growlService;
        this._restService = _restService;
        this._router = _router;
        this.model = {};
    }
    NewTicketComponent.prototype.createTicket = function () {
        var _this = this;
        this._restService.post("ticket", this.model).subscribe(function () {
            //this.alerts.success('Ticket submited');
            //setTimeout(()=>{this._router.navigate(['/helpdesk']);},1000);
            _this._growlService.addMessage("success", "Done", "Ticket created, we will get back ASAP");
            _this._router.navigate(['/helpdesk']);
        });
    };
    NewTicketComponent.prototype.ngOnInit = function () {
    };
    NewTicketComponent = __decorate([
        core_1.Component({
            selector: 'app-new-ticket',
            templateUrl: './new-ticket.component.html',
            styleUrls: ['./new-ticket.component.css']
        })
    ], NewTicketComponent);
    return NewTicketComponent;
}());
exports.NewTicketComponent = NewTicketComponent;
//# sourceMappingURL=new-ticket.component.js.map