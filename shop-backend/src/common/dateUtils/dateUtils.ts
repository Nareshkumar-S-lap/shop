import { DATE_FORMAT } from '@common/constants/constant';
import moment from 'moment';

export class DateUtils {
  static formatDate(date: Date): string {
    return moment(date).format(DATE_FORMAT);
  }
}
