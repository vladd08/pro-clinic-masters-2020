import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { DateHelper } from 'src/shared/utils/classes/date-helper/date-helper';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { Subject, Observable } from 'rxjs';
import { Shift } from 'src/app/dashboard/models/shift/shift';

@Injectable({
    providedIn: 'root'
})
export class WorkingHoursService {
    private readonly workedHoursInADay = 8;

    constructor(private dashboardService: DashboardService) {}

    public getWorkedHours(
        lowerDateRange: Date = moment().startOf('month').toDate(),
        upperDateRange: Date = moment().toDate()
    ): Observable<number> {
        const subject = new Subject<number>();

        const workingDaysBetweenDates = this.getWorkingDaysBetweenDates(
            moment(lowerDateRange),
            moment(upperDateRange)
        );

        const defaultWorkedHoursBetweenDates =
            workingDaysBetweenDates * this.workedHoursInADay;

        this.dashboardService
            .getShifts(lowerDateRange, upperDateRange)
            .subscribe({
                next: (response: Array<Shift>) => {
                    let shiftHours = 0;
                    response.map((shift: Shift) => {
                        shiftHours += shift.hours;
                    });

                    subject.next(defaultWorkedHoursBetweenDates + shiftHours);
                    subject.complete();
                }
            });

        return subject.asObservable();
    }

    private getWorkingDaysBetweenDates(
        lowerDateRange: moment.Moment = moment().startOf('month'),
        upperDateRange: moment.Moment = moment()
    ): number {
        let workingDays = 0;

        while (lowerDateRange.isSameOrBefore(upperDateRange)) {
            const day = lowerDateRange.get('day');

            if (
                day !== DateHelper.SaturdayDayOfWeekIndex &&
                day !== DateHelper.SundayDayOfWeekIndex
            ) {
                workingDays += 1;
            }

            lowerDateRange = lowerDateRange.add(1, 'day');
        }

        return workingDays;
    }
}
