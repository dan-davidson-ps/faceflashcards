import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Room } from './room';
import { RoomService } from './room.service';

@Component({
  selector: 'room-detail',
  templateUrl: 'app/room-detail.component.html',
  styleUrls: ['app/room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  room: Room;

  constructor(
    private roomService: RoomService,
    private routeParams: RouteParams) {
  }

  ngOnInit() {
    let id:string = this.routeParams.get('id');
    this.roomService.getRoom(id)
      .then(room => this.room = room);
  }

}
