import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
export class TimeHelper {
  public static getDate(fullDate: Date): string {
    return dayjs(fullDate).format('YYYY-MM-DD');
  }
  public static setHoursForEndDate({ value }): Date {
    return value
      ? dayjs(value)
          .set('hour', 23)
          .set('minute', 59)
          .set('second', 59)
          .set('millisecond', 999)
          .toDate()
      : value;
  }
}
