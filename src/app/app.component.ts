/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {Routes, Router} from '@angular/router';

import {AppState} from './app.service';
import {Home} from './home';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {RouterActive} from './router-active';
import {MapComponent} from './map';
import {RoomService} from './room/room.service'
import {About} from './about';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [],
  directives: [RouterActive],
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
          <a md-button [routerLink]="['/site/farmingtonWest']">Farmington - West</a>
          <a md-button [routerLink]="['/site/farmingtonEast']">Farmington - East</a>
          <a md-button [routerLink]="['/about']">About</a>
      </md-toolbar>

      <md-progress-bar mode="indeterminate" color="primary" *ngIf="loading"></md-progress-bar>

      <router-outlet></router-outlet>

      </md-content>
  `
})
@Routes([
  {path: '/about', name: 'About', component: About},
  {path: '/site/:site', component: MapComponent},
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  // {path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About')}
])
export class App {
  loading = false;
  name = 'Conference Room Finder';
  url = 'https://www.pluralsight.com';

  constructor(public appState:AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}
