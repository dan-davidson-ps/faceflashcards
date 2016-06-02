import { Room } from './room';
import { SITES } from './mock-rooms';
import { Injectable } from '@angular/core';

@Injectable()
export class RoomService {
  getRooms(siteId:string) {
    return Promise.resolve(SITES[siteId]);
  }

  getRoom(siteId: string, id: string) {
    return Promise.resolve(SITES[siteId].rooms).then(rooms => rooms.filter((room:Room) => {room.id === id}))[0];
  }

  getSite(siteId: string) {
    return Promise.resolve(SITES[siteId])
  }
}
