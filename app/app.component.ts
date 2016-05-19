import {Component, OnInit} from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import {RoomService} from './room.service';
import {MapComponent} from './map.component';
import {RoomDetailComponent} from './room-detail.component';
import {HTTP_PROVIDERS, Http} from '@angular/http'

@Component({
    selector: 'conf-room-finder-app',
    template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['/site/farmingtonWest']">Farmington - West</a>
      <a [routerLink]="['/site/farmingtonEast']">Farmington - East</a>
    </nav>
    <router-outlet></router-outlet>
  `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        HTTP_PROVIDERS,
        RoomService
    ]
})
@Routes([
    {path: '/site/:site',  component: MapComponent}
])
export class AppComponent {
    title = 'Conference Room Finder';

    constructor(private router: Router) {}

    // ngOnInit() {
    //     this.router.navigate(['/site/farmingtonWest']);
    // }
}
