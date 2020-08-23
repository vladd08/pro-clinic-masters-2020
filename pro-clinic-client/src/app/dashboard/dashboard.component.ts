import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ShiftsService } from '../shifts/services/shifts.service';
import { MatDialog } from '@angular/material/dialog';
import { Guid } from 'src/shared/utils/classes/guid/guid';
import { ShiftsSummaryDialogComponent } from './shifts-summary-dialog/shifts-summary-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { AdminData } from './resolvers/admin-data.resolver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from './services/admin/admin.service';

// This component has a lot of code that can be extracted
// A lot of things are here and are not supposed to
// A lot of @ts-ignores as well, this code really needs a do-over
@Component({
    selector: 'pc-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
    public visits = new Array<Visit>();
    public shifts = new Array<Shift>();
    public emergencies = new Array<Emergency>();
    public workedHours = 0;

    public defaultShiftHourlyRate: number;
    public weekendShiftHourlyRate: number;
    public shiftHoursLimit: number;

    public adminData: AdminData;

    public currentDateLowerRange = moment().startOf('month');
    public currentDateUpperRange = moment();

    private visitsEmergenciesPieChart: Highcharts.Chart;
    private extraHoursChart: Highcharts.Chart;
    private monthOverviewChart: Highcharts.Chart;

    constructor(
        private idleService: IdleService,
        private route: ActivatedRoute,
        private dashboardService: DashboardService,
        private workingHoursService: WorkingHoursService,
        private spinnerService: SpinnerService,
        private shiftsService: ShiftsService,
        private router: Router,
        private dialog: MatDialog,
        private cookieService: CookieService,
        private snackBar: MatSnackBar,
        private adminService: AdminService
    ) {}

    ngOnInit(): void {
        this.idleService.start();
        if (!this.isAdministrator()) {
            this.setVisitsFromResolver();
            this.setShiftsFromResolver();
            this.setEmergenciesFromResolver();
            this.setWorkedHoursFromResolver();
            return;
        }

        this.adminData = this.route.snapshot.data.adminData[0];
        this.defaultShiftHourlyRate = this.adminData.hourlyRate;
        this.weekendShiftHourlyRate = this.adminData.weekendHourlyRate;
        this.shiftHoursLimit = this.adminData.shiftLimit;
        console.log(this.adminData);
    }

    ngAfterViewInit(): void {
        this.drawVisitsEmergenciesChart();
        this.drawExtraHoursChart(this.shiftsService, this.shifts);
        this.drawMonthOverviewChart();
    }

    public isAdministrator = (): boolean =>
        this.cookieService.get('email') === 'admin@proclinic.com';

    public updateAdminData(): void {
        this.adminService
            .setAdminData(
                this.defaultShiftHourlyRate,
                this.weekendShiftHourlyRate,
                this.shiftHoursLimit
            )
            .then(() => {
                this.snackBar.open('Successfully updated');
            });
    }

    public goToVisits(): void {
        this.router.navigate(['/visits']);
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
    }

    private setShiftsFromResolver(): void {
        this.shifts = this.route.snapshot.data.shifts;
        this.shifts = this.shifts.map((shift: Shift) => {
            shift.guid = Guid.Generate();
            return shift;
        });
    }

    private setEmergenciesFromResolver(): void {
        this.emergencies = this.route.snapshot.data.emergencies;
    }

    private setWorkedHoursFromResolver(): void {
        this.workedHours = this.route.snapshot.data.workedHours;
    }

    private getStatistics(): void {
        this.spinnerService.showSpinner();
        this.dashboardService
            .getVisits(
                this.currentDateLowerRange.toDate(),
                this.currentDateUpperRange.toDate()
            )
            .pipe(
                switchMap((response: Array<Visit>) => {
                    this.visits = response;
                    return this.dashboardService.getEmergencies(
                        this.currentDateLowerRange.toDate(),
                        this.currentDateUpperRange.toDate()
                    );
                }),
                switchMap((response: Array<Emergency>) => {
                    this.emergencies = response;
                    return this.shiftsService.getShifts(
                        this.currentDateLowerRange.toDate(),
                        this.currentDateUpperRange.toDate()
                    );
                }),
                switchMap((response: Array<Shift>) => {
                    this.shifts = response;
                    this.shifts = this.shifts.map((shift: Shift) => {
                        shift.guid = Guid.Generate();
                        return shift;
                    });
                    return this.workingHoursService.getWorkedHours(
                        this.currentDateLowerRange.toDate(),
                        this.currentDateUpperRange.toDate()
                    );
                })
            )
            .subscribe({
                next: (response: number) => {
                    this.workedHours = response;
                    this.spinnerService.hideSpinner();
                    this.updateVisitsEmergenciesChart();
                    this.updateExtraHoursChart();
                    this.updateMonthOverviewChart();
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
                text: ''
            },
            plotOptions: {
                pie: {
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
                    name: 'Count',
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

    private drawExtraHoursChart(
        shiftsService: ShiftsService,
        shifts: Array<Shift>
    ): void {
        // @ts-ignore
        this.extraHoursChart = Highcharts.chart('extraHours', {
            chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
            colors: ['#2BBBAD', '#33b5e5'],
            xAxis: {
                categories: ['Hours']
            },
            yAxis: {
                title: {
                    text: 'Working time'
                }
            },
            series: [
                {
                    name: 'Hours',
                    data: [
                        this.workedHours -
                            this.dashboardService.getTotalShiftHours(
                                this.shifts
                            )
                    ]
                },
                {
                    name: 'Extra Hours',
                    data: [
                        this.dashboardService.getTotalShiftHours(this.shifts)
                    ],
                    tooltip: {
                        pointFormatter() {
                            return `Extra Hours: <b>${
                                this.y
                            }</b> <br> Total Payment: <b>${shiftsService.getTotalPayment(
                                shifts
                            )} RON</b>`;
                        }
                    }
                }
            ],
            credits: {
                enabled: false
            }
        });
    }

    private drawMonthOverviewChart(): void {
        // @ts-ignore
        this.monthOverviewChart = Highcharts.chart('monthOverview', {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: (params: {
                                point: {
                                    category: string;
                                    options: { y: number };
                                    ids: Array<string>;
                                };
                            }) => {
                                const dateString = params.point.category;
                                const ids = params.point.ids;

                                const shifts = ids.map(
                                    (id: string) =>
                                        this.shifts[
                                            this.shifts.indexOf(
                                                this.shifts.find(
                                                    (sh: Shift) =>
                                                        sh.guid === id
                                                )
                                            )
                                        ]
                                );

                                this.dialog.open(ShiftsSummaryDialogComponent, {
                                    data: {
                                        shifts,
                                        date: dateString
                                    }
                                });
                            }
                        }
                    }
                }
            },
            colors: ['#ff4081', '#FF8800', '#33b5e5', '#2BBBAD'],
            xAxis: {
                categories: this.getMonthOverviewChartXAxisCategories()
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            series: this.getMonthOverviewChartVisitSeries(),
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

    private updateExtraHoursChart(): void {
        this.extraHoursChart.update({
            series: [
                {
                    name: 'Hours',
                    data: [
                        this.workedHours -
                            this.dashboardService.getTotalShiftHours(
                                this.shifts
                            )
                    ],
                    type: 'bar'
                },
                {
                    name: 'Extra Hours',
                    data: [
                        this.dashboardService.getTotalShiftHours(this.shifts)
                    ],
                    type: 'bar'
                }
            ]
        });
        this.extraHoursChart.redraw();
    }

    private updateMonthOverviewChart(): void {
        this.monthOverviewChart.update({
            // @ts-ignore
            series: this.getMonthOverviewChartVisitSeries()
        });
    }

    private getMonthOverviewChartXAxisCategories(): Array<string> {
        const dates = [];
        const startDate = moment(this.currentDateLowerRange);
        const endDate = moment(this.currentDateUpperRange);

        while (startDate.isBefore(endDate)) {
            dates.push(startDate.format('DD MMM, YYYY'));
            startDate.add(1, 'day');
        }

        return dates;
    }

    // This probably has a highcharts type, don't need to strong type by ourselves
    private getMonthOverviewChartVisitSeries(): Array<{
        name: string;
        data: Array<number>;
    }> {
        const dates = this.getMonthOverviewChartXAxisCategories();

        const visits = [];
        const emergencies = [];
        const shifts = [];
        const workedHours = [];

        dates.map((date: string) => {
            const visitsOnDate = this.visits.filter((visit: Visit) =>
                moment(visit.date.toDate()).isSame(moment(new Date(date)))
            );

            const emergenciesOnDate = this.emergencies.filter(
                (emergency: Emergency) =>
                    moment(emergency.date.toDate()).isSame(
                        moment(new Date(date))
                    )
            );

            let hours = 8;

            const shiftsOnDate = this.shifts.filter((shift: Shift) => {
                const hasShift =
                    moment(shift.date.toDate()).isSameOrAfter(
                        moment(new Date(date)).startOf('day')
                    ) &&
                    moment(shift.date.toDate()).isSameOrBefore(
                        moment(new Date(date)).endOf('day')
                    );

                if (hasShift) {
                    hours += shift.hours;
                }

                return hasShift;
            });

            visits.push(visitsOnDate.length);
            emergencies.push(emergenciesOnDate.length);
            shifts.push({
                y: shiftsOnDate.length,
                ids: shiftsOnDate.map((sh: Shift) => sh.guid)
            });
            !DateHelper.IsWeekend(new Date(date))
                ? workedHours.push(hours)
                : workedHours.push(0);
        });

        return [
            {
                name: 'Visits',
                data: visits
            },
            {
                name: 'Emergencies',
                data: emergencies
            },
            {
                name: 'Shifts',
                data: shifts
            },
            {
                name: 'Worked Hours',
                data: workedHours
            }
        ];
    }
}
