import { WeekDays } from '@common/enum/enums';

class LocalUtils {
  static mapHolidayList = (holidays: number[]): string[] => {
    return holidays.map((day) => WeekDays[day] ?? 'Unknown');
  };
}

export default LocalUtils;
