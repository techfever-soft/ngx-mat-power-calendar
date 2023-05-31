import { BehaviorSubject, Subject } from 'rxjs';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-mat-power-calendar',
  template: `
    <div *ngIf="type === 'month'">
      <lib-month type="month" [locale]="locale" [theme]="theme"></lib-month>
    </div>
    <div *ngIf="type === 'extended-month'">
      <lib-month type="extended-month"></lib-month>
    </div>
  `,
  styles: [],
})
export class NgxMatPowerCalendarComponent implements OnInit {
  @Input('type') public type!: string;
  @Input('localeSubject') public locale!: Subject<string>;
  @Input('themeSubject') public theme!: Subject<string>;

  constructor() {}

  ngOnInit(): void {}
}
