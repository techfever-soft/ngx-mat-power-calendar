import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';

import moment from 'moment';
import { NgxMatPowerCalendarService } from '../../../ngx-mat-power-calendar.service';
import { IPowerEvent } from '../../../interfaces/calendar.interface';

@Component({
  selector: 'lib-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.css'],
})
export class AddEventDialogComponent {
  @ViewChild('fullDay') fullDay!: MatSlideToggle;
  @ViewChild('startDateInput') startDateInput!: HTMLInputElement;
  @ViewChild('colorInput') colorInput!: HTMLInputElement;

  public addEventForm: FormGroup;

  public now: moment.Moment;

  public minStartDate: moment.Moment;

  public minDate: moment.Moment = moment();

  public endDate: moment.Moment = moment();

  public colors = [
    { selected: false, color: '#f44336' },
    { selected: false, color: '#e91e63' },
    { selected: false, color: '#9c27b0' },
    { selected: false, color: '#673ab7' },
    { selected: false, color: '#3f51b5' },
    { selected: false, color: '#2196f3' },
    { selected: false, color: '#03a9f4' },
    { selected: false, color: '#00bcd4' },
    { selected: false, color: '#009688' },
    { selected: false, color: '#4caf50' },
    { selected: false, color: '#8bc34a' },
    { selected: false, color: '#cddc39' },
    { selected: false, color: '#ffeb3b' },
    { selected: false, color: '#ffc107' },
    { selected: false, color: '#ff9800' },
    { selected: false, color: '#ff5722' },
    { selected: false, color: '#795548' },
    { selected: false, color: '#9e9e9e' },
    { selected: false, color: '#607d8b' },
  ];

  public selectedColor!: string;

  constructor(
    @Inject(DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private calendarService: NgxMatPowerCalendarService
  ) {
    this.addEventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      color: ['', Validators.required],
      fullDay: [false],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      endTime: ['', Validators.required],
    });

    this.now =
      data.selectedDate && data.selectedDate.date
        ? data.selectedDate.date
        : moment();

    this.minStartDate =
      data.selectedDate && data.selectedDate.date
        ? moment(data.selectedDate.date)
        : moment();

    this.selectColor(this.colors[0]);

    this.bindDefaultValues();

    console.log(this.data);
    
  }

  public submitEvent() {
    console.log(this.addEventForm.value);

    const event: IPowerEvent = {
      title: this.addEventForm.value.title,
      description: this.addEventForm.value.description,
      color: this.selectedColor,
      fullDay: this.fullDay.checked,
      startAt: this.addEventForm.get('startDate')?.value,
      endAt: this.addEventForm.get('endDate')?.value,
    };

    this.calendarService.addEventToDay(
      this.data.selectedDate,
      event
    );
  }

  public changeDate(event: any) {
    if (event.value && event.value > this.endDate) {
      this.minDate = event.value;
      this.endDate = this.minDate.clone();
      this.addEventForm.get('endDate')?.setValue(this.endDate);
    }
  }

  public selectColor(color: any) {
    this.selectedColor = color.color;

    this.colors.forEach((color) => {
      color.selected = false;
    });

    color.selected = true;
  }

  private bindDefaultValues() {
    this.addEventForm.get('color')?.setValue(this.selectedColor);

    this.addEventForm.get('startDate')?.setValue(this.now);
    this.addEventForm.get('startTime')?.setValue(this.now.format('HH:mm A'));

    this.addEventForm.get('endDate')?.setValue(this.endDate);
    this.addEventForm.get('endTime')?.setValue(this.endDate.format('HH:mm A'));
  }
}
