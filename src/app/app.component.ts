/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {Routes} from '@angular/router';
import {AuthenticationService} from './authentication'

import {AppState} from './app.service';
import {MapComponent} from './map';
import {RoomService} from './room'
import {About} from './about';

declare var gapi:any;

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [],
  directives: [],
  providers: [RoomService],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    require('./app.css')
  ],
  template: `
    <md-content>
      <md-toolbar color="primary">
          <span>{{ name }}</span>
          <span class="fill"></span>
          <a [routerLink]="['/site/farmingtonWest']"><button md-button>Farmington - West</button></a>
          <a [routerLink]="['/site/farmingtonEast']"><button md-button>Farmington - East</button></a>
          <!--<a [routerLink]="['/about']"><button md-button>About</button></a>-->
         <button md-button (click)="login()">Login</button>
      </md-toolbar>

      <md-progress-bar mode="indeterminate" color="primary" *ngIf="loading"></md-progress-bar>

      <router-outlet></router-outlet>
      
      <section class="feedback">
        <a href="https://goo.gl/forms/nR91piae4XMmveEr2" target="_blank">
           <button md-mini-fab aria-label="Suggestions" (click)="feedback()">
            <md-icon>comment</md-icon>
          </button>
        </a>
      </section>

    </md-content>
  `
})
@Routes([
  // {path: '/about', component: About},
  {path: '/site/:site', component: MapComponent},
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  // {path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About')}
])
export class App {
  loading = false;
  name = 'Conference Room Finder';
  url = 'https://www.pluralsight.com';

  constructor(public appState:AppState, public authentication:AuthenticationService) {
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

  login() {
    this.authentication.login()
  }

}
