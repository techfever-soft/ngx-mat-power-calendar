export interface IPowerDay {
  id?: string;
  index: number;
  date: moment.Moment;
  isNow?: boolean;
  weekDay?: number;
  metadata?: any;
  events?: IPowerEvent[];
}

export interface IPowerEvent {
  id?: string;

  startAt?: moment.Moment;
  endAt?: moment.Moment;
  title: string;
  description: string;
  color: string;
  fullDay: boolean;

  top?: number;
  left?: number;
  height?: number;
}

export interface IPowerWeek {
  days: IPowerDay[];
}
