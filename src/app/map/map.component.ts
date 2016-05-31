import {ViewChild, ElementRef, Component, Input, Inject} from '@angular/core';
import {OnActivate, Router, RouteSegment} from '@angular/router';

import {Room} from '../room';
import {Site} from '../site';
import {RoomService} from '../room/room.service';
import {SvgImageComponent} from '../svg-icon';

declare var jQuery:any;

@Component({
  selector: 'map',
  templateUrl: 'app/map/map.component.html',
  styleUrls: ['app/map/map.component.css'],
  directives: [SvgImageComponent]
})
export class MapComponent implements OnActivate {

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
      .then((site:Site) => {
        this.image = "assets/img/" + site.image;
        this.rooms = site.rooms;
      })
      .catch((err:any) => console.error(err))

  }

  showDetail(room:Room) {
    //TODO:
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.rooms.forEach((room) => {
        let roomElement = document.getElementById(room.id)
        // console.log('room', room.id, roomElement)
        if (roomElement) {
          roomElement.setAttribute('style', '')
          roomElement.setAttribute('class', 'conf-room')
        }
      })
    }, 1000) //hack
  }
}
