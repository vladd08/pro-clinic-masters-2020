import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { first } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { CookieService } from 'ngx-cookie-service';
import { FirebaseHelper } from 'src/shared/utils/classes/firebase/firebase-helper';
import { Shift } from 'src/app/dashboard/models/shift/shift';
import { DateHelper } from 'src/shared/utils/classes/date-helper/date-helper';

@Injectable({
    providedIn: 'root'
})
export class ShiftsService {
    private readonly shiftHourlyRate = 50;
    private readonly weekendShiftHourlyRate = 75;

    constructor(
        private firestore: AngularFirestore,
        private cookieService: CookieService
    ) {}

    public getShifts = (
        lowerRange: Date = moment().startOf('month').toDate(),
        upperRange: Date = moment().toDate()
    ): Observable<Array<Shift>> =>
        this.firestore
            .collection<Shift>(FirebaseHelper.ShiftsCollectionName, (ref) =>
                ref.orderBy('date').startAt(lowerRange).endAt(upperRange)
            )
            .valueChanges()
            .pipe(first());

    public isShiftOngoing(): Observable<{
        isOngoing: boolean;
        shift: Shift;
    }> {
        const subject = new Subject<{
            isOngoing: boolean;
            shift: Shift;
        }>();

        this.firestore
            .collection<Shift>(FirebaseHelper.ShiftsCollectionName, (ref) =>
                ref
                    .where('date', '>', moment().startOf('day').toDate())
                    .where('date', '<', moment().add(1, 'days').toDate())
            )
            .valueChanges()
            .pipe(first())
            .subscribe({
                next: (response) => {
                    // TODO: Array helper
                    const isShiftOngoing = response.length !== 0;
                    subject.next({
                        isOngoing: isShiftOngoing,
                        shift: response[0]
                    });
                    subject.complete();
                }
            });

        return subject.asObservable();
    }

    public startShift = (hours: number): Promise<any> =>
        this.firestore
            .collection<any>(FirebaseHelper.ShiftsCollectionName)
            .add({
                hours,
                date: moment().toDate(),
                userId: this.cookieService.get('uid')
            });

    public getPayment = (shift: Shift): number =>
        DateHelper.IsWeekend(shift.date.toDate())
            ? shift.hours * this.weekendShiftHourlyRate
            : shift.hours * this.shiftHourlyRate;

    public getTotalHours(shifts: Array<Shift>): number {
        let total = 0;

        shifts.map((shift: Shift) => {
            total += shift.hours;
        });

        return total;
    }

    public getTotalPayment(shifts: Array<Shift>): number {
        let total = 0;

        shifts.map((shift: Shift) => {
            total += this.getPayment(shift);
        });

        return total;
    }

    public getHourlyRate = (): number => this.shiftHourlyRate;

    public getWeekendHourlyRate = (): number => this.weekendShiftHourlyRate;
}
