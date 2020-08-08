import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as moment from 'moment';
import * as Highcharts from 'highcharts';

import { DashboardService } from './services/dashboard.service';
import { Emergency } from './models/emergency/emergency';
import { IdleService } from 'src/core/services/idle/idle.service';
import { Shift } from './models/shift/shift';
import { Visit } from './models/visit/visit';
import { WorkingHoursService } from 'src/shared/services/working-hours/working-hours.service';
import { DateHelper } from 'src/shared/utils/classes/date-helper/date-helper';
import { SpinnerService } from 'src/shared/services/spinner/spinner.service';

@Component({
    selector: 'pc-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public visits = new Array<Visit>();
    public shifts = new Array<Shift>();
    public emergencies = new Array<Emergency>();
    public workedHours = 0;

    public currentDateLowerRange = moment().startOf('month');
    public currentDateUpperRange = moment();

    private visitsEmergenciesPieChart: Highcharts.Chart;

    constructor(
        private idleService: IdleService,
        private route: ActivatedRoute,
        private dashboardService: DashboardService,
        private workingHoursService: WorkingHoursService,
        private spinnerService: SpinnerService
    ) {}

    ngOnInit(): void {
        this.idleService.start();
        this.setVisitsFromResolver();
        this.setShiftsFromResolver();
        this.setEmergenciesFromResolver();
        this.setWorkedHoursFromResolver();
        this.drawVisitsEmergenciesChart();
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

    public isDateUpperRangeToday = (): boolean =>
        DateHelper.IsCurrentDay(this.currentDateUpperRange.toDate()) &&
        DateHelper.IsCurrentMonth(this.currentDateUpperRange.toDate());

    // For testing purposes and to accommodate firebase read quotas, don't go below june
    public shouldHideBackButton = (): boolean =>
        this.currentDateLowerRange.get('month') === DateHelper.JuneMonthIndex;

    // Don't go above current month
    public shouldHideForwardButton = (): boolean =>
        DateHelper.IsCurrentMonth(this.currentDateUpperRange.toDate());

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

    private setWorkedHoursFromResolver(): void {
        this.workedHours = this.route.snapshot.data.workedHours;
        console.log('worked hours', this.workedHours);
    }

    private getStatistics(): void {
        console.log('getting statistics for ranges:');
        console.log(
            'upper range',
            this.currentDateUpperRange.format('DD MMM, YYYY')
        );
        console.log(
            'lower range',
            this.currentDateLowerRange.format('DD MMM, YYYY')
        );
        this.spinnerService.showSpinner();
        this.dashboardService
            .getVisits(
                this.currentDateLowerRange.toDate(),
                this.currentDateUpperRange.toDate()
            )
            .pipe(
                switchMap((response: Array<Visit>) => {
                    this.visits = response;
                    console.log('visits', this.visits);
                    return this.dashboardService.getEmergencies(
                        this.currentDateLowerRange.toDate(),
                        this.currentDateUpperRange.toDate()
                    );
                }),
                switchMap((response: Array<Emergency>) => {
                    this.emergencies = response;
                    console.log('emergencies', this.emergencies);
                    return this.dashboardService.getShifts(
                        this.currentDateLowerRange.toDate(),
                        this.currentDateUpperRange.toDate()
                    );
                }),
                switchMap((response: Array<Shift>) => {
                    this.shifts = response;
                    console.log('shifts', this.shifts);
                    return this.workingHoursService.getWorkedHours(
                        this.currentDateLowerRange.toDate(),
                        this.currentDateUpperRange.toDate()
                    );
                })
            )
            .subscribe({
                next: (response: number) => {
                    this.workedHours = response;
                    console.log('worked hours', this.workedHours);
                    this.spinnerService.hideSpinner();
                    this.updateVisitsEmergenciesChart();
                }
            });
    }

    private subtractMonth(): void {
        // TODO: Move more subtract/add startOf/endOf logic elsewhere
        this.currentDateLowerRange = this.currentDateLowerRange
            .subtract(1, 'months')
            .startOf('month');
        this.currentDateUpperRange = this.currentDateUpperRange
            .subtract(1, 'months')
            .endOf('month');

        this.getStatistics();
    }

    private addMonth(): void {
        if (this.isDateUpperRangeToday()) {
            console.log('same day');
            return;
        }

        this.currentDateLowerRange = this.currentDateLowerRange.add(
            1,
            'months'
        );
        this.currentDateUpperRange = this.currentDateUpperRange.add(
            1,
            'months'
        );

        // Clever programming
        if (this.isDateUpperRangeCurrentMonth()) {
            this.setDateRangeUntilCurrentDay();
        }

        this.getStatistics();
    }

    private isDateUpperRangeCurrentMonth = (): boolean =>
        this.currentDateUpperRange.isSameOrAfter(moment.utc());

    private setDateRangeUntilCurrentDay(): void {
        this.currentDateLowerRange = moment().startOf('month');
        this.currentDateUpperRange = moment();
    }

    private drawVisitsEmergenciesChart(): void {
        // @ts-ignore this is great, isn't it
        this.visitsEmergenciesPieChart = Highcharts.chart('visitsEmergencies', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Visits & Emergencies'
            },
            plotOptions: {
                pie: {
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            // TODO: Color service?
            colors: ['#ff4081', '#FF8800'],
            series: [
                {
                    name: 'Visits & Emergencies',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'Visits',
                            y: this.getVisitsCount() ? this.getVisitsCount() : 1
                        },
                        {
                            name: 'Emergencies',
                            y: this.getEmergenciesCount()
                                ? this.getEmergenciesCount()
                                : 1
                        }
                    ]
                }
            ],
            credits: {
                enabled: false
            }
        });
    }

    private updateVisitsEmergenciesChart(): void {
        this.visitsEmergenciesPieChart.update({
            series: [
                // @ts-ignore oh my..
                {
                    data: [
                        // @ts-ignore oh my..
                        this.getVisitsCount() ? this.getVisitsCount() : 1,
                        // @ts-ignore oh my..
                        this.getEmergenciesCount()
                            ? this.getEmergenciesCount()
                            : 0
                    ]
                }
            ]
        });
        this.visitsEmergenciesPieChart.redraw();
    }
}
