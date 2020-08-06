import * as moment from 'moment';

export class DateHelper {
    public static readonly SecondsInAMinute = 60;
    public static readonly SecondsInAHour = DateHelper.SecondsInAMinute * 60;
    public static readonly MinUtcDate = moment.utc().toDate();

    public static GetDateOneHourFromCurrent = (): Date =>
        moment.utc().add(1, 'hours').toDate();
}
