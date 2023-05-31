import { Component, Input, OnInit } from '@angular/core';
import { IPowerDay, IPowerWeek } from '../../interfaces/calendar.interface';
import { NgxMatPowerCalendarService } from '../../ngx-mat-power-calendar.service';
import { expand } from '../../animations/month.animation';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'lib-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css'],
  animations: [expand],
})
export class MonthComponent {
  @Input('type') type!: string;
  @Input('locale') locale!: Subject<string>;
  @Input('theme') theme!: Subject<string>;

  public currentTheme: string = 'primary';
  public currentLocale: string = 'en';

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
    this.locale.subscribe((locale) => {
      this.initWeekDays(locale);
      this.currentLocale = locale;
    });

    this.theme.subscribe((theme) => {
      this.currentTheme = theme;
    });

    this.initMonthDays();
  }

  private initWeekDays(locale: string): void {
    this.weekDays = [];
    for (let i = 0; i < 7; i++) {
      this.weekDays.push(
        moment()
          .weekday(i + 1)
          .locale(locale)
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

  private prepareMonthDaysForTable(days: IPowerDay[]): void {
    this.calendarService.prepareDaysForTable(days).then((table: any[]) => {
      this.weeks = table;
    });
  }

  public isSameDate(today: moment.Moment, target: moment.Moment): boolean {
    const todayDate = today.date() + 1;
    return todayDate == target.date();
  }

  public showDay(day: IPowerDay): void {
    this.selectedDay = day;
    this.dayExpanded = true;
  }

  public openAddEventDialog(): void {
    this.matDialog.open(AddEventDialogComponent, {
      data: {
        selectedDate: this.selectedDay,
      },
    });
  }

  public scrollToNow(): void {
    const hourTracker = document.body.querySelector(
      '.hour-tracker'
    ) as HTMLElement;
    const hoursContainer = document.body.querySelector(
      '.day--hours'
    ) as HTMLElement;

    hourTracker.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });

    setTimeout(() => {
      hoursContainer.scrollLeft = 0;
    }, 500);
  }
}
