import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
export class TimeHelper {
  public static getDate(fullDate: Date): string {
    return dayjs(fullDate).format('YYYY-MM-DD');
  }
}
