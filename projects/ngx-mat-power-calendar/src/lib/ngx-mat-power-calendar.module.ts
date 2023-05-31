import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddEventDialogComponent } from './components/month/add-event-dialog/add-event-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DayComponent } from './components/day/day.component';
import { MaterialModule } from './material.module';
import { MomentModule } from 'ngx-moment';
import { MonthComponent } from './components/month/month.component';
import { NgModule } from '@angular/core';
import { NgxMatPowerCalendarComponent } from './ngx-mat-power-calendar.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

@NgModule({
  declarations: [
    NgxMatPowerCalendarComponent,
    MonthComponent,
    DayComponent,
    AddEventDialogComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentModule,
    NgxMatTimepickerModule.setLocale('en-EN'),
  ],
  exports: [
    NgxMatPowerCalendarComponent,
    MonthComponent,
    DayComponent,
    AddEventDialogComponent,
  ],
})
export class NgxMatPowerCalendarModule {}
