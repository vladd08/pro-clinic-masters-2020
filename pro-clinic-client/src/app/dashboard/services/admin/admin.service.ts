import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    constructor(private firestore: AngularFirestore) {}

    public getAdminData = (): Observable<any> =>
        this.firestore.collection('admin').valueChanges().pipe(first());

    public setAdminData = (
        hourlyRate: number,
        weekendHourlyRate: number,
        shiftLimit: number
    ) =>
        this.firestore.collection('admin').doc('hb5Aomqu019m2yxy34hU').set({
            hourlyRate,
            shiftLimit,
            weekendHourlyRate
        });
}
