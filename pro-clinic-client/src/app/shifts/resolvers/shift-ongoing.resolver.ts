import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { ShiftsService } from '../services/shifts.service';
import { Shift } from 'src/app/dashboard/models/shift/shift';

@Injectable({
    providedIn: 'root'
})
export class ShiftOngoingResolver
    implements
        Resolve<{
            isOngoing: boolean;
            shift: Shift;
        }> {
    constructor(private shiftsService: ShiftsService) {}
    public resolve = (): Observable<{
        isOngoing: boolean;
        shift: Shift;
    }> => this.shiftsService.isShiftOngoing();
}
