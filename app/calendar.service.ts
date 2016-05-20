import { Injectable } from '@angular/core';
import { DateTimeRange } from './date-time-range'
// var google = require('googleapis');

@Injectable()
export class CalendarService {
    public getAvail(auth:any, dateTimeRange:DateTimeRange, calID:string) {
        // console.log('auth:'+JSON.stringify(auth));
        // console.log('date Time Range :'+(dateTimeRange.start).toISOString()+' --->'+(dateTimeRange.end).toISOString());
        // console.log('calendar id to check freebusy:'+calID);
        // var deferred = Q.defer(); // get a new deferral
        // calendar.freebusy.query({
        //     auth: auth,
        //     headers: { "content-type" : "application/json" },
        //     resource:{items: [{"id" : calID}],   //needed to include resource instead of sending the params directly.
        //
        //         timeMin: (dateTimeRange.start).toISOString(),
        //         timeMax: (dateTimeRange.end).toISOString()
        //     }
        // }, function(err, response) {
        //     console.log('Response from the Calendar service: ' + JSON.stringify(response));
        //     if (err) {
        //         console.log('There was an error contacting the Calendar service: ' + err);
        //         deferred.reject(); // deferred reject here
        //         return;
        //     }
        //     var events = response.calendars[calID].busy;
        //     if (events.length == 0) {
        //         console.log('No upcoming events found.');
        //     } else {
        //         console.log('busy in here...');
        //     }
        //     deferred.resolve(response); // deferred resolve here
        // });
        // return deferred.promise; // return a promise
    }
}