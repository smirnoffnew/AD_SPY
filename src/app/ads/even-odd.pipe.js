"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var EvenOddPipe = (function () {
    function EvenOddPipe() {
    }
    EvenOddPipe.prototype.transform = function (value, filter) {
        if (!value || (filter !== 'even' && filter !== 'odd')) {
            return value;
        }
        //return value.filter(item, idx => return filter === 'even' ? idx % 2 === 1);
        return value.filter(function (item) {
            if (filter === 'even') {
                if (value.indexOf(item) % 2 == 0)
                    return value;
                return null;
            }
            else {
                if (value.indexOf(item) % 2 == 1)
                    return value;
                return null;
            }
        });
    };
    EvenOddPipe = __decorate([
        core_1.Pipe({
            name: 'evenOdd'
        })
    ], EvenOddPipe);
    return EvenOddPipe;
}());
exports.EvenOddPipe = EvenOddPipe;
//# sourceMappingURL=even-odd.pipe.js.map