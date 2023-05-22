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
    console.log(this.day);

    this.generateHours(this.day);

    setInterval(() => {
      this.updateMinutes();
    }, 60000);

    const updateTime = moment().startOf('day').add(1, 'day');
    const updatePeriod = 24 * 60 * 60 * 1000; // 24 heures en millisecondes

    setTimeout(() => {
      setInterval(() => {
        this.updateHours();
      }, updatePeriod);
      this.updateHours();
    }, updateTime.diff(moment()));

    // TODO: scroll to the current time
    // setTimeout(() => {
    //   const container = document.querySelector('.day--hours') as HTMLElement;
    //   const height = document.querySelector('.hour-tracker') as HTMLElement;
    //   if (height && container) {
    //     let newHeight = height.scrollHeight as number;
    //     container.scrollTo({
    //       top: newHeight,
    //       behavior:'smooth',
    //     })
    //   }
    // }, 1000);
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
      console.log(event);
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
    // Réinitialiser le tableau "hours"
    this.hours = [];

    // Générer les heures mises à jour pour la journée en cours
    this.generateHours({
      date: moment(),
      index: 0,
    });
  }
}
