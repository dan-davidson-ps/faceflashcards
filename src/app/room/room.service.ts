import {Injectable} from '@angular/core';
import {Subject} from 'rxjs'

import {Room} from '../room';
import {Site} from '../site';
import {AuthenticationService} from '../authentication'

declare var gapi:any;

@Injectable()
export class RoomService {
  private sites:any
  private roomsByResourceId:any
  private roomsByEmail:any

  private roomInitializedSource = new Subject<Room>()
  roomInitialized$ = this.roomInitializedSource.asObservable()

  private allRoomsInitializedSource = new Subject<Site[]>();
  allRoomsInitialized$ = this.allRoomsInitializedSource.asObservable();
  private allRoomsInitialized = false;

  private roomAvailabilitySource = new Subject<Room>();
  roomAvailability$ = this.roomAvailabilitySource.asObservable();

  constructor(public authentication:AuthenticationService) {
    this.loadRooms()
    this.authentication.userChanged$.subscribe((user) => {
      this.initRooms()
    })
  }

  private loadRooms() {
    let roomData = require('assets/rooms.json');
    this.sites = roomData
    this.roomsByResourceId = {}
    this.roomsByEmail = {}
    var names = Object.getOwnPropertyNames(this.sites);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      this.sites[name].rooms.forEach((room) => {
        if (room.resourceId) {
          this.roomsByResourceId[room.resourceId] = room
        }
      })
    }
  }

  getRooms(siteId:string):Promise<Site> {
    return Promise.resolve(this.sites[siteId]);
  }

  getRoom(siteId:string, id:string):Promise<Site> {
    return Promise.resolve(this.sites[siteId].rooms).then(rooms => rooms.filter((room:Room) => {
      room.id === id
    }))[0];
  }

  getSite(siteId:string):Promise<Site> {
    return Promise.resolve(this.sites[siteId])
  }

  initRooms() {
    this.authentication.initAPI.then(() => {
      let request = gapi.client.directory.resources.calendars.list(
        {
          'customer': 'my_customer',
          'maxResults': 200
        }
      )

      request.execute((resp) => {
        resp.result.items.forEach((room) => {
          this.initRoom(room)
        })
        this.allRoomsInitialized = true
        this.allRoomsInitializedSource.next(this.sites)
      })
    })
  }

  private initRoom(resourceRoom) {
    let room = this.roomsByResourceId[resourceRoom.resourceId]

    if (room) {
      room.resourceName = resourceRoom.resourceName
      room.resourceType = resourceRoom.resourceType
      room.resourceDescription = resourceRoom.resourceDescription
      room.resourceEmail = resourceRoom.resourceEmail
      this.roomsByEmail[resourceRoom.resourceEmail] = room
      this.roomInitializedSource.next(room)
    } else {
      // console.log('room not defined', resourceRoom.resourceName)
    }
  }

  updateSiteAvailability(site:string, start: Date, end: Date) {
    if (! this.allRoomsInitialized) {
      return
    }

    this.authentication.initAPI.then(() => {
      let requestItems = []
      this.sites[site].rooms.forEach((room) => {
        requestItems.push({
          "id": room.resourceEmail
        })
      })

      let requestParams = {
        "items": requestItems,
        "timeMin": start,
        "timeMax": end
      }

      let request = gapi.client.calendar.freebusy.query(requestParams);

      let result = []

      request.execute((resp) => {
        var names = Object.getOwnPropertyNames(resp.result.calendars);
        for (let i = 0; i < names.length; i++) {
          let name = names[i];
          let busyResult = resp.result.calendars[name].busy
          let room:Room = this.roomsByEmail[name]
          room.busy = busyResult
          this.roomAvailabilitySource.next(room)
        }
      });
    })
  }

}
