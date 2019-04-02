import * as moment from 'moment';


// "2019-03-24"
const LOCAL_DATE_FORMAT = 'YYYY-MM-DD';

export function parseLocalDate(date: string): Date {
  return moment(date, LOCAL_DATE_FORMAT).toDate();
}

export function stringifyLocalDate(date: Date): string {
  return moment(date).format(LOCAL_DATE_FORMAT);
}

// ISO 8601
export function parseLocalDateTime(date: string): Date {
  return moment(date).toDate();
}

export function stringifyLocalDateTime(date: Date): string {
  return moment(date).format();
}
