import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {NgFor, NgModel} from '@angular/common';

@Component({
  selector: 'my-date',
  events: ['dateChange'],
  inputs: ['date'],
  template: '<md-input type="datetime-local" [value]="_date" (change)="onDateChange($event.target.value)"></md-input>'
})
  // template: '<md-input type="datetime-local" [value]="_date" (change)="onDateChange($event.target.value)"></md-input>'
export class CustomDate {
  private _date:string;

  set date(d:Date) {
    this._date = this.toDateString(d);
  }

  get date() {
    return this._date
  }

  dateChange:EventEmitter<Date>;

  constructor() {
    this.date = new Date();
    this.dateChange = new EventEmitter<Date>();
  }

  private toDateString(date:Date):string {
    return (date.getFullYear().toString() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate())).slice(-2))
      + 'T' + date.toTimeString().slice(0, 5);
  }

  private parseDateString(date:string):Date {
    date = date.replace('T', '-');
    let parts:any = date.split('-');
    let timeParts:any = parts[3].split(':');

    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(
      parts[0],
      parts[1] - 1,
      parts[2],
      timeParts[0],
      timeParts[1]); // Note: months are 0-based

  }

  private onDateChange(value:string):void {
    if (value != this._date) {


      var parsedDate = this.parseDateString(value);

      // check if date is valid first
      if (parsedDate.getTime() != NaN) {
        this._date = value;
        this.dateChange.emit(parsedDate);
      }
    }
  }
}
