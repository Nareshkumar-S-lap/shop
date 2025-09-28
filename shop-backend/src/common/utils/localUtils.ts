import { WeekDays } from '@common/enum/enums';

class LocalUtils {
  static mapHolidayList = (holidays: number[]): string[] => {
    return holidays.map((day) => WeekDays[day] ?? 'Unknown');
  };

  static formatAddress = (address?: {
    city?: string;
    state?: string;
    postal_code?: string;
  }) => {
    if (!address) return '';
    return [address.city, address.state, address.postal_code]
      .filter(Boolean)
      .join(', ');
  };
}

export default LocalUtils;
