import { Room } from '../room';
import { Site } from '../site';
import { SITES } from './mock-rooms';
import { Injectable } from '@angular/core';

declare var gapi:any;

@Injectable()
export class RoomService {
  getRooms(siteId:string):Promise<Site> {
    return Promise.resolve(SITES[siteId]);
  }

  getRoom(siteId: string, id: string):Promise<Site> {
    return Promise.resolve(SITES[siteId].rooms).then(rooms => rooms.filter((room:Room) => {room.id === id}))[0];
  }

  getSite(siteId: string):Promise<Site> {
    return Promise.resolve(SITES[siteId])
  }

  getRoomAvailabilityTest() {
    return new Promise((resolve, reject) => {

      var request = gapi.client.calendar.freebusy.query(
        {
          "items": [
            {
              "id": "pluralsight.com_31363038373632383038@resource.calendar.google.com"
            }
          ],
          "timeMin": "2016-06-01T00:00:00.000Z",
          "timeMax": "2016-06-02T00:00:00.000Z"
        }
      );

      // {
      //   "kind": "calendar#freeBusy",
      //   "calendars": {
      //   "pluralsight.com_31363038373632383038@resource.calendar.google.com": {
      //     "busy": [
      //       {
      //         "start": "2016-06-01T17:00:00Z",
      //         "end": "2016-06-01T18:00:00Z"
      //       },
      //       {
      //         "start": "2016-06-01T19:30:00Z",
      //         "end": "2016-06-01T20:30:00Z"
      //       }
      //     ]
      //   }
      // }
      // }

      request.execute((resp) => {
         console.log('response', resp)
      });

      request = gapi.client.directory.resources.calendars.list(
        {
          'customer': 'my_customer',
          'maxResults': 200
        }
      )

      request.execute((resp) => {
        console.log('resources', resp)
      })
    });
  }
}
