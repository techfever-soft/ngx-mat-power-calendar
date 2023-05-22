import { Component, OnInit } from '@angular/core';
import { IPowerDay, IPowerWeek } from '../../interfaces/calendar.interface';
import { NgxMatPowerCalendarService } from '../../ngx-mat-power-calendar.service';
import { expand } from '../../animations/month.animation';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';

@Component({
  selector: 'lib-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css'],
  animations: [expand],
})
export class MonthComponent {
  private monthDays: IPowerDay[] = [];

  public weeks: IPowerWeek[] = [];
  public weekDays: string[] = [];

  public dayExpanded: boolean = false;
  public isScrolled: boolean = false;

  public selectedDay!: IPowerDay;

  public todayDate = moment().subtract(1, 'day');

  constructor(
    private calendarService: NgxMatPowerCalendarService,
    private matDialog: MatDialog
  ) {
    // this.calendarService.currentMonth.subscribe(month => {
    //   tfhis.currentMonth = month;
    // })
  }

  ngOnInit(): void {
    this.initWeekDays();

    this.initMonthDays();
  }

  public isSameDate(today: moment.Moment, target: moment.Moment): boolean {
    const todayDate = today.date() + 1;
    return todayDate == target.date();
  }

  private initWeekDays(): void {
    this.weekDays = [];
    for (let i = 0; i < 7; i++) {
      this.weekDays.push(
        moment()
          .weekday(i + 1)
          .format('ddd')
      );
    }
  }

  private initMonthDays(): void {
    const monthEnd: number = moment().daysInMonth();

    for (let i = 0; i < monthEnd; i++) {
      const date: moment.Moment = moment()
        .startOf('month')
        .add(i, 'day')
        .startOf('day');

      this.monthDays.push(<IPowerDay>{
        index: i,
        date: date,
        isNow: moment(date).isSame(moment(), 'day'),
        // events: [
        //   {
        //     title: 'test',
        //     description: '',
        //     color: '#f44336',
        //     fullDay: false,
        //     startAt: moment(),
        //     endAt: moment(),
        //   },
        // ],
      });
    }

    this.prepareMonthDaysForTable(this.monthDays);
  }

  public showDay(day: IPowerDay) {
    this.selectedDay = day;
    this.dayExpanded = true;
  }

  public openAddEventDialog() {
    this.matDialog.open(AddEventDialogComponent, {
      data: {
        selectedDate: this.selectedDay,
      },
    });
  }

  public scrollToNow() {
    const hourTracker = document.querySelector('.hour-tracker') as HTMLElement;
    hourTracker.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'start',
    });
  }

  private prepareMonthDaysForTable(days: IPowerDay[]): void {
    this.calendarService.prepareDaysForTable(days).then((table: any[]) => {
      this.weeks = table;
    });
  }
}
