import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HTTP_PROVIDERS, Http} from '@angular/http';

import {RoomService} from './room.service';
import {MapComponent} from './map.component';
import {RoomDetailComponent} from './room-detail.component';

@Component({
    selector: 'conf-room-finder-app',
    template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['MapView']">Map View</a>
    </nav>
    <router-outlet></router-outlet>
  `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        RoomService
    ]
})
@RouteConfig([
    {
        path: '/map',
        name: 'MapView',
        component: MapComponent,
        useAsDefault: true
    }
])
export class AppComponent {
    title = 'Conference Room Finder';
}
