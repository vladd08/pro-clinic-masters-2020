import * as moment from 'moment';

export class DateHelper {
    public static readonly SecondsInAMinute = 60;
    public static readonly SecondsInAHour = DateHelper.SecondsInAMinute * 60;

    public static readonly MinUtcDate = moment.utc().toDate();

    public static readonly SundayDayOfWeekIndex = 0;
    public static readonly SaturdayDayOfWeekIndex = 6;
    public static readonly JuneMonthIndex = 5;

    public static GetDateOneHourFromCurrent = (): Date =>
        moment().add(1, 'hours').toDate();

    public static IsDateAfterToday = (date: Date): boolean =>
        moment(date).isAfter(moment());

    public static IsCurrentMonth = (date: Date) =>
        moment(date).get('month') === moment().get('month');

    public static IsCurrentDay = (date: Date) =>
        moment(date).get('day') === moment().get('day');
}
