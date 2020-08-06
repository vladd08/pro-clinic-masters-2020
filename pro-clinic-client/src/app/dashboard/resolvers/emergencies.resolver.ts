import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { DashboardService } from '../services/dashboard.service';
import { Emergency } from '../models/emergency/emergency';

@Injectable({
    providedIn: 'root'
})
export class EmergenciesResolver implements Resolve<Array<Emergency>> {
    constructor(private dashboardService: DashboardService) {}

    public resolve = (): Observable<Array<Emergency>> =>
        this.dashboardService.getEmergencies();
}
