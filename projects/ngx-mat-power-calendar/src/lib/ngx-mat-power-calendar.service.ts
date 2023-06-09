import { IPowerDay, IPowerEvent } from './interfaces/calendar.interface';

import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class NgxMatPowerCalendarService {
  constructor() {}

  /**
   * Add an event to the selected day
   *
   * @param day IPowerDay
   * @param event IPowerEvent
   */
  public addEventToDay(day: IPowerDay, event: IPowerEvent): void {
    day.events?.push(event);
  }

  /**
   * Calculate the top absolute position in pixels of an event
   *
   * @param day IPowerDay
   * @param event IPowerEvent
   * @returns number
   */
  public calculateEventTop(day: IPowerDay, event: IPowerEvent): number {
    const startTime = moment(event.startAt);
    const endTime = moment(event.endAt);

    const dayStart = moment(day.date).startOf('day');
    const dayDurationInMinutes = moment(day.date)
      .endOf('day')
      .diff(dayStart, 'minutes');

    const eventStartMinutes = startTime
      .startOf('hour')
      .diff(dayStart, 'minutes');

    return eventStartMinutes * (60 / 60) + 15;
  }

  /**
   * Calculate the height in pixels of an event
   *
   * @param event IPowerEvent
   * @returns number
   */
  public calculateEventHeight(event: IPowerEvent): number {
    const startTime = moment(event.startAt);
    const endTime = moment(event.endAt);

    const eventDurationInMinutes = endTime.diff(startTime, 'minutes');
    const pixelsPerHour = 60; // Nombre de pixels par heure (ajustez selon vos besoins)

    return (eventDurationInMinutes / 60) * pixelsPerHour;
  }

  /**
   * Returns an array of days formatted to fit a month calendar
   *
   * @param days IPowerDay[]
   * @returns Promise<any[]>
   */
  public prepareDaysForTable(days: IPowerDay[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let table: any[] = [];
      let week: any[] = [];

      let currentWeek = 0;
      // Add empty days to the beginning of the month, if necessary
      let firstDay = moment(days[0].date);
      while (firstDay.day() !== 0) {
        week[firstDay.day()] = {};
        firstDay.subtract(1, 'day');
      }
      days.forEach((day) => {
        day.weekDay = moment(day.date).subtract(1, 'day').day();
        day.isNow = moment(day.date).isSame(moment(), 'day');
        day.id = 'week-' + moment(day.date);
        day.events = [];

        week[day.weekDay] = day;

        // If the day is part of the last week of the month, add empty days to the end of the month, if necessary
        if (moment(day.date).date() === moment(day.date).daysInMonth()) {
          while (moment(day.date).day() !== 6) {
            week[moment(day.date).day() + 1] = { index: 0 };
            day = {
              date: moment(day.date).add(1, 'day'),
              index: 0,
              events: [],
            };
          }
        }
        if (day.weekDay === 6) {
          table[currentWeek++] = { days: week };
          week = [];
        }
      });

      // Add empty days to the end of the last week, if necessary
      let lastDay = moment(days[days.length - 1].date);
      while (lastDay.day() !== 6) {
        week[lastDay.day() + 1] = {};
        lastDay.add(1, 'day');
      }
      table[currentWeek] = { days: week };

      resolve(table);
    });
  }
}
