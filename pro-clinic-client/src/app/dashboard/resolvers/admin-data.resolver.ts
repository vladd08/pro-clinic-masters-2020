import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { DashboardService } from '../services/dashboard.service';
import { Emergency } from '../models/emergency/emergency';
import { AdminService } from '../services/admin/admin.service';

@Injectable({
    providedIn: 'root'
})
export class AdminDataResolver implements Resolve<Array<AdminData>> {
    constructor(private adminService: AdminService) {}

    public resolve = (): Observable<Array<AdminData>> =>
        this.adminService.getAdminData();
}

export interface AdminData {
    hourlyRate: number;
    weekendHourlyRate: number;
    shiftLimit: number;
}
