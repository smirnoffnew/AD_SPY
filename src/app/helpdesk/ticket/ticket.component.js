"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var primeng_1 = require('primeng/primeng');
var TicketComponent = (function () {
    function TicketComponent(_growlService, _restService, _libService, _router, _route, confirmationService) {
        this._growlService = _growlService;
        this._restService = _restService;
        this._libService = _libService;
        this._router = _router;
        this._route = _route;
        this.confirmationService = confirmationService;
        this.ticket = {};
        this.model = {};
    }
    TicketComponent.prototype.confirmCloseTicket = function () {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to close this ticket?',
            accept: function () {
                _this.closeTicket();
            }
        });
    };
    TicketComponent.prototype.getTicket = function () {
        var _this = this;
        this._restService.get("ticket", { id: this.id }).subscribe(function (t) {
            _this.ticket = t;
        });
    };
    TicketComponent.prototype.closeTicket = function () {
        this._restService.delete("ticket", this.id).subscribe(function () {
        });
        this._growlService.addMessage("success", "Done", "Ticket closed");
        this._router.navigate(['/helpdesk']);
    };
    TicketComponent.prototype.createMessage = function () {
        var _this = this;
        this.model.id = this.id;
        this._restService.put("ticket", this.model).subscribe(function () {
            _this.model = {};
            _this.getTicket();
            _this._growlService.addMessage("success", "Done", "Message submitted");
            //this.alerts.success("Message submitted");
            //this.alerts.success('Ticket submited');
            //setTimeout(()=>{this._router.navigate(['/helpdesk']);},1000);
        });
    };
    //this._router.navigate(['/helpdesk']);
    TicketComponent.prototype.ngOnInit = function () {
        this.id = this._route.snapshot.params['id'];
        this.getTicket();
    };
    TicketComponent = __decorate([
        core_1.Component({
            selector: 'app-ticket',
            templateUrl: './ticket.component.html',
            styleUrls: ['./ticket.component.css'],
            providers: [primeng_1.ConfirmationService]
        })
    ], TicketComponent);
    return TicketComponent;
}());
exports.TicketComponent = TicketComponent;
//# sourceMappingURL=ticket.component.js.map