/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {Routes, Router} from '@angular/router';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {AuthenticationService} from './authentication'

import {AppState} from './app.service';
import {Home} from './home';
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
          <button md-button><a [routerLink]="['/site/farmingtonWest']">Farmington - West</a></button>
          <button md-button><a [routerLink]="['/site/farmingtonEast']">Farmington - East</a></button>
          <button md-button><a [routerLink]="['/about']">About</a></button>
          <button md-button (click)="login()">Login</button>
      </md-toolbar>

      <md-progress-bar mode="indeterminate" color="primary" *ngIf="loading"></md-progress-bar>

      <router-outlet></router-outlet>

      </md-content>
  `
})
@Routes([
  {path: '/about', component: About},
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
