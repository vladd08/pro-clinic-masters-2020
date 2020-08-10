import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { first } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { CookieService } from 'ngx-cookie-service';
import { FirebaseHelper } from 'src/shared/utils/classes/firebase/firebase-helper';
import { Shift } from 'src/app/dashboard/models/shift/shift';

@Injectable({
    providedIn: 'root'
})
export class ShiftsService {
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
}
