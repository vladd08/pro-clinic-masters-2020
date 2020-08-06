import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { DashboardService } from '../services/dashboard.service';
import { Shift } from '../models/shift/shift';

@Injectable({
    providedIn: 'root'
})
export class ShiftsResolver implements Resolve<Array<Shift>> {
    constructor(private dashboardService: DashboardService) {}

    public resolve = (): Observable<Array<Shift>> =>
        this.dashboardService.getShifts();
}
