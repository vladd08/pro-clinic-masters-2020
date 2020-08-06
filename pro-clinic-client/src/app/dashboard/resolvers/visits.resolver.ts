import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { DashboardService } from '../services/dashboard.service';
import { Visit } from '../models/visit/visit';

@Injectable({
    providedIn: 'root'
})
export class VisitsResolver implements Resolve<Array<Visit>> {
    constructor(private dashboardService: DashboardService) {}

    public resolve = (): Observable<Array<Visit>> =>
        this.dashboardService.getVisits();
}
