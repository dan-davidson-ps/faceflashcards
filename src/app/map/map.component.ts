import {ViewChild, ElementRef, Component, Input, Inject, AfterViewChecked} from '@angular/core';
import {OnActivate, Router, RouteSegment} from '@angular/router';

import {Room} from '../room';
import {Site} from '../site';
import {RoomService} from '../room';
import {SvgImageComponent} from '../svg-icon';

declare var jQuery:any;

@Component({
  selector: 'map',
  templateUrl: 'app/map/map.component.html',
  styleUrls: ['app/map/map.component.css'],
  directives: [SvgImageComponent]
})
export class MapComponent implements OnActivate, AfterViewChecked {

  private image:string;
  private site:Site;
  private startDate:Date;
  private endDate:Date;
  private sitePromise:Promise<any>;
  private roomCssInitialized:boolean = false

  @ViewChild(SvgImageComponent) svg:SvgImageComponent;

  rooms:Room[] = [];

  constructor(private router:Router,
              private roomService:RoomService,
              private elementRef:ElementRef) {
    this.startDate = new Date()
    this.endDate = new Date()
    this.endDate.setDate(this.endDate.getDate() + 7)

    roomService.allRoomsInitialized$.subscribe(() => {
      this.updateSiteAvailabilty()
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

  updateSiteAvailabilty() {
    this.roomService.updateSiteAvailability(this.site.id, this.startDate, this.endDate);
  }

  ngAfterViewInit() {
    // console.log('afterViewInit')
  }

  ngAfterViewChecked() {
    // console.log('afterViewChecked')
    this.svg.svgLoaded$.subscribe((val) => {
      // console.log('svgLoaded event fired')
      if (!this.roomCssInitialized) {
        // console.log('initialized was false')
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
      // console.log('room', room.id, roomElement)
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
