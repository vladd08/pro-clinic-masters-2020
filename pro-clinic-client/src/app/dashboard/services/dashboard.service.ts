import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import * as moment from 'moment';

import { Emergency } from '../models/emergency/emergency';
import { FirebaseHelper } from 'src/shared/utils/classes/firebase/firebase-helper';
import { Visit } from '../models/visit/visit';
import { Shift } from '../models/shift/shift';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(private firestore: AngularFirestore) {}

    public getVisits = (
        lowerRange: Date = moment.utc().startOf('month').toDate(),
        upperRange: Date = moment.utc().toDate()
    ): Observable<Array<Visit>> =>
        this.firestore
            .collection<Visit>(FirebaseHelper.VisitsCollectionName, (ref) =>
                ref
                    .where('date', '>=', lowerRange)
                    .where('date', '<=', upperRange)
            )
            .valueChanges()
            .pipe(first());

    public getShifts = (
        lowerRange: Date = moment.utc().startOf('month').toDate(),
        upperRange: Date = moment.utc().toDate()
    ): Observable<Array<Shift>> =>
        this.firestore
            .collection<Shift>(FirebaseHelper.ShiftsCollectionName, (ref) =>
                ref
                    .where('date', '>=', lowerRange)
                    .where('date', '<=', upperRange)
            )
            .valueChanges()
            .pipe(first());

    public getEmergencies = (
        lowerRange: Date = moment.utc().startOf('month').toDate(),
        upperRange: Date = moment.utc().toDate()
    ): Observable<Array<Emergency>> =>
        this.firestore
            .collection<Emergency>(
                FirebaseHelper.EmergenciesCollectionName,
                (ref) =>
                    ref
                        .where('date', '>=', lowerRange)
                        .where('date', '<=', upperRange)
            )
            .valueChanges()
            .pipe(first());
}
