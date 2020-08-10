import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Shift } from '../models/shift/shift';
import { ShiftsService } from 'src/app/shifts/services/shifts.service';

@Injectable({
    providedIn: 'root'
})
export class ShiftsResolver implements Resolve<Array<Shift>> {
    constructor(private shiftsService: ShiftsService) {}

    public resolve = (): Observable<Array<Shift>> =>
        this.shiftsService.getShifts();
}
