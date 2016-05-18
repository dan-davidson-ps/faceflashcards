import {ViewChild, ElementRef, Component, OnInit, Input, Inject} from '@angular/core';
import {OnActivate, Router, RouteSegment} from '@angular/router';

import {Room} from './room';
import {RoomService} from './room.service';
import {SvgImageComponent} from './svg-icon.component';

declare var jQuery:any;

@Component({
    selector: 'map',
    templateUrl: 'app/map.component.html',
    styleUrls: ['app/map.component.css'],
    directives: [SvgImageComponent]
})
export class MapComponent implements OnInit, OnActivate {

    private image:string;
    private site:string;


    @ViewChild(SvgImageComponent) svg:ElementRef;

    rooms:Room[] = [];

    constructor(private router:Router,
                private roomService:RoomService,
                private elementRef:ElementRef) {
    }

    routerOnActivate(curr:RouteSegment):void {
        this.site = curr.getParam('site');
        this.roomService.getSite(this.site)
            .then(site => {
                console.log('site', site);
                console.log('image', site.image);
                this.image = "images/" + site.image;
                this.rooms = site.rooms;
            })
            .catch(err => console.error(err))

    }

    // ngOnInit() {
    //     this.roomService.getRooms(this.site)
    //         .then(rooms => {
    //             this.rooms = rooms
    //         })
    //         .catch(err => console.error('error loading rooms for site: '+this.site, err ))
    // }

    showDetail(room:Room) {
        //TODO:
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.rooms.forEach((room) => {
                let roomElement = document.getElementById(room.id)
                console.log('room', room.id, roomElement)
                if (roomElement) {
                    roomElement.setAttribute('style', '')
                    roomElement.setAttribute('class', 'conf-room')
                }
            })
        }, 1000) //hack
    }
}
