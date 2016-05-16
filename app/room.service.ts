import { Room } from './room';
import { ROOMS } from './mock-rooms';
import { Injectable } from '@angular/core';

@Injectable()
export class RoomService {
  getRooms() {
    return Promise.resolve(ROOMS);
  }

  getRoom(id: string) {
    return Promise.resolve(ROOMS).then(
      room => room.filter(room => room.id === id)[0]
    );
  }
}
