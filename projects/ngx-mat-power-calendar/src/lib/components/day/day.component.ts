import { Component, Input, OnInit } from '@angular/core';
import { IPowerDay, IPowerEvent } from '../../interfaces/calendar.interface';

import { NgxMatPowerCalendarService } from '../../ngx-mat-power-calendar.service';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'lib-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
})
export class DayComponent implements OnInit {
  @Input('day') day!: IPowerDay;

  public hours: any[] = [];

  constructor(private calendarService: NgxMatPowerCalendarService) {}

  ngOnInit(): void {
    this.generateHours(this.day);

    setInterval(() => {
      this.updateMinutes();
    }, 60000);

    const updateTime = moment().startOf('day').add(1, 'day');
    const updatePeriod = 24 * 60 * 60 * 1000;

    setTimeout(() => {
      setInterval(() => {
        this.updateHours();
      }, updatePeriod);
      this.updateHours();
    }, updateTime.diff(moment()));
  }

  private generateHours(day: IPowerDay): void {
    for (let i = 0; i < 24; i++) {
      let date: moment.Moment = day.date
        .clone()
        .startOf('day')
        .subtract(2, 'hours');

      let offset: number = moment().utcOffset();
      date.add(offset, 'minutes');

      this.hours.push({
        index: i,
        date: date.add(i, 'hours'),
        isNow: date.isSame(moment().utcOffset(offset), 'hour'),
        top: moment().minutes(),
      });
    }

    day.events?.forEach((event: IPowerEvent, index: number) => {
      const eventTop = this.calendarService.calculateEventTop(this.day, event);
      const eventHeight = this.calendarService.calculateEventHeight(event);
      if (day.events) {
        day.events[index] = {
          id: uuid(),

          ...event,

          top: eventTop,
          height: eventHeight,
        };
      }
    });
  }

  private updateMinutes(): void {
    for (let i = 0; i < this.hours.length; i++) {
      this.hours[i].top = moment().minutes();
    }
  }

  private updateHours(): void {
    this.hours = [];

    this.generateHours({
      date: moment(),
      index: 0,
    });
  }
}
