import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatPowerCalendarComponent } from './ngx-mat-power-calendar.component';

describe('NgxMatPowerCalendarComponent', () => {
  let component: NgxMatPowerCalendarComponent;
  let fixture: ComponentFixture<NgxMatPowerCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMatPowerCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxMatPowerCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
