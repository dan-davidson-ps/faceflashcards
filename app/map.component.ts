import {ViewChild, ElementRef, Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router-deprecated';

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
export class MapComponent implements OnInit {

    @ViewChild(SvgImageComponent) svg:ElementRef;

    rooms:Room[] = [];

    constructor(private router:Router,
                private roomService:RoomService,
                private elementRef:ElementRef) {
    }

    ngOnInit() {
        this.roomService.getRooms()
            .then(rooms => {
                this.rooms = rooms
            })
            .catch(err => console.error('error loading rooms', err ))
    }

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
