import { TestBed } from '@angular/core/testing';

import { NgxMatPowerCalendarService } from './ngx-mat-power-calendar.service';

describe('NgxMatPowerCalendarService', () => {
  let service: NgxMatPowerCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMatPowerCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
