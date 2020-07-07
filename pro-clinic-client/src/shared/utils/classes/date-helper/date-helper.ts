import * as moment from 'moment';

export class DateHelper {
    public static SecondsInAMinute = 60;
    public static SecondsInAHour = DateHelper.SecondsInAMinute * 60;

    public static GetDateOneHourFromCurrent = (): Date =>
        moment.utc().add(1, 'hours').toDate();
}
