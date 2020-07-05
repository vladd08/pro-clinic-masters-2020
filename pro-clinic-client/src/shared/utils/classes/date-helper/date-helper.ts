import * as moment from 'moment';

export class DateHelper {
    public static GetDateOneHourFromCurrent = (): Date =>
        moment.utc().add(1, 'hours').toDate();
}
