import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { DashboardService } from './services/dashboard.service';
import { Emergency } from './models/emergency/emergency';
import { IdleService } from 'src/core/services/idle/idle.service';
import { Shift } from './models/shift/shift';
import { Visit } from './models/visit/visit';

@Component({
    selector: 'pc-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public visits = new Array<Visit>();
    public shifts = new Array<Shift>();
    public emergencies = new Array<Emergency>();

    public currentDateLowerRange = moment.utc().startOf('month');
    public currentDateUpperRange = moment.utc();

    constructor(
        private idleService: IdleService,
        private route: ActivatedRoute,
        private dashboardService: DashboardService
    ) {}

    ngOnInit(): void {
        this.idleService.start();
        this.setVisitsFromResolver();
        this.setShiftsFromResolver();
        this.setEmergenciesFromResolver();
    }

    public getCurrentDateLowerRange = (): string =>
        this.currentDateLowerRange.format('DD MMM, YYYY');

    public getCurrentDateUpperRange = (): string =>
        this.currentDateUpperRange.format('DD MMM, YYYY');

    public getVisitsCount = (): number =>
        this.visits.length ? this.visits.length + 1 : 0;

    public getShiftsCount = (): number =>
        this.shifts.length ? this.shifts.length + 1 : 0;

    public getEmergenciesCount = (): number =>
        this.emergencies.length ? this.emergencies.length + 1 : 0;

    public goMonthBack(): void {
        this.subtractMonth();
    }

    public goMonthForward(): void {
        this.addMonth();
    }

    private setVisitsFromResolver(): void {
        this.visits = this.route.snapshot.data.visits;
        console.log('visits', this.visits);
    }

    private setShiftsFromResolver(): void {
        this.shifts = this.route.snapshot.data.shifts;
        console.log('shifts', this.shifts);
    }

    private setEmergenciesFromResolver(): void {
        this.emergencies = this.route.snapshot.data.emergencies;
        console.log('emergencies', this.emergencies);
    }

    private getVisits(): void {
        this.dashboardService
            .getVisits(
                this.currentDateLowerRange.toDate(),
                this.currentDateUpperRange.toDate()
            )
            .subscribe({
                next: (visits: Array<Visit>) => {
                    this.visits = visits;
                    console.log('visits', this.visits);
                }
            });
    }

    private getShifts(): void {
        this.dashboardService
            .getShifts(
                this.currentDateLowerRange.toDate(),
                this.currentDateUpperRange.toDate()
            )
            .subscribe({
                next: (shifts: Array<Shift>) => {
                    this.shifts = shifts;
                    console.log('shifts', this.shifts);
                }
            });
    }

    private getEmergencies(): void {
        this.dashboardService
            .getEmergencies(
                this.currentDateLowerRange.toDate(),
                this.currentDateUpperRange.toDate()
            )
            .subscribe({
                next: (emergencies: Array<Emergency>) => {
                    this.emergencies = emergencies;
                    console.log('emergencies', this.emergencies);
                }
            });
    }

    private subtractMonth(): void {
        this.currentDateLowerRange = this.currentDateLowerRange
            .subtract(1, 'months')
            .startOf('month');
        this.currentDateUpperRange = this.currentDateUpperRange
            .subtract(1, 'months')
            .endOf('month');

        this.getVisits();
        this.getShifts();
        this.getEmergencies();

        console.log(
            'upper range',
            this.currentDateUpperRange.format('DD MMM, YYYY')
        );
        console.log(
            'lower range',
            this.currentDateLowerRange.format('DD MMM, YYYY')
        );
    }

    private addMonth(): void {
        this.currentDateLowerRange = this.currentDateLowerRange.add(
            1,
            'months'
        );
        this.currentDateUpperRange = this.currentDateUpperRange.add(
            1,
            'months'
        );

        // Clever programming, intelecc
        if (this.isDateUpperRangeCurrentMonth()) {
            this.currentDateLowerRange = moment.utc().startOf('month');
            this.currentDateUpperRange = moment.utc();
            return;
        }

        this.getVisits();
        this.getShifts();
        this.getEmergencies();

        console.log(
            'upper range',
            this.currentDateUpperRange.format('DD MMM, YYYY')
        );
        console.log(
            'lower range',
            this.currentDateLowerRange.format('DD MMM, YYYY')
        );
    }

    private isDateUpperRangeCurrentMonth = (): boolean =>
        this.currentDateUpperRange.isSameOrAfter(moment.utc());
}
