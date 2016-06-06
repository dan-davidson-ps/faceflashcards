import {ViewChild, ElementRef, Component, Input, AfterViewChecked} from '@angular/core';
import {OnActivate, Router, RouteSegment} from '@angular/router';

import {Room} from '../room';
import {Site} from '../site';
import {RoomService} from '../room';
import {SvgImageComponent} from '../svg-icon';
import {CustomDate} from '../date';

declare var jQuery:any;

@Component({
  selector: 'map',
  templateUrl: 'app/map/map.component.html',
  styleUrls: ['app/map/map.component.css'],
  directives: [SvgImageComponent,CustomDate]
})
export class MapComponent implements OnActivate, AfterViewChecked {

  private image:string;
  private site:Site;
  @Input() private startDate:Date;
  @Input() private endDate:Date;
  private sitePromise:Promise<any>;
  private roomCssInitialized:boolean = false

  @ViewChild(SvgImageComponent) svg:SvgImageComponent;

  rooms:Room[] = [];

  constructor(private router:Router,
              private roomService:RoomService,
              private elementRef:ElementRef) {
    this.startDate = new Date()
    this.endDate = new Date()
    this.endDate.setHours(this.endDate.getHours() + 1)

    roomService.allRoomsInitialized$.subscribe(() => {
      this.updateSiteAvailability()
    })

    roomService.roomAvailability$.subscribe((room:Room) => {
      setTimeout(() => {
        this.displayRoomAvailability(room)
      }, this.randomDelay(100, 500))
    })



  }

  private randomDelay(bottom, top) {
    return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
  }

  routerOnActivate(curr:RouteSegment):void {
    let siteName = curr.getParam('site');
    this.sitePromise = this.roomService.getSite(siteName)
      .then((site:Site) => {
        this.site = site;
        this.image = "assets/img/" + site.image;
        this.rooms = site.rooms;
      })
      .catch((err:any) => console.error(err))
  }

  showDetail(room:Room) {
    //TODO:
  }

  updateSiteAvailability() {
    this.roomService.updateSiteAvailability(this.site.id, this.startDate, this.endDate);
  }

  ngAfterViewChecked() {
    this.svg.svgLoaded$.subscribe((val) => {
      if (!this.roomCssInitialized) {
        this.initRoomCss()
      }
    })
  }

  /*
   inkscape doesn't have a good way to set css style/class, but at least it has a way to set element id
   go through and find rooms by id and add css class
   */
  initRoomCss() {
    this.rooms.forEach((room) => {
      let roomElement = document.getElementById(room.id)
      if (roomElement) {
        this.roomCssInitialized = true
        roomElement.setAttribute('style', '')
        roomElement.setAttribute('class', 'conf-room')
      }
    })
  }

  displayRoomAvailability(room:Room) {
    let roomElement = document.getElementById(room.id)
    if (roomElement) {
      if (room.busy.length === 0) {
        roomElement.setAttribute('class', 'conf-room-available')
      } else {
        roomElement.setAttribute('class', 'conf-room-busy')
      }
    }
  }
}
