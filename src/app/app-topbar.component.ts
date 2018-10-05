import {Component, Inject, forwardRef, OnInit} from '@angular/core';
import {AppComponent} from './app.component';
import {AuthService} from "./auth.service";
import {RestService} from "./rest.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html'
})
export class AppTopBarComponent {
  topbarItemClick;
  topbarMenuActive;

  constructor(@Inject(forwardRef(() => AppComponent)) public app:AppComponent,
              public _authService:AuthService,
            public _restService:RestService
  ) {
  }

  onTopbarMenuButtonClick(event) {
    this.topbarItemClick = true;
    this.topbarMenuActive = !this.topbarMenuActive;

    event.preventDefault();
  }
  // ngOnInit() {
  //   //alert('redirecting')
  //   //window.location.href = 'http://www.cnn.com/';
  //
  // }
  // logout() {
  //   alert('redirecting')
  //   this.redirect();
  //   this._authService.logout();
  //
  //
  //
  //   alert('wtf')
  //   //this._authService.logout();
  //   //window.location.href = 'http://www.cnn.com/';
  //
  // }
}
