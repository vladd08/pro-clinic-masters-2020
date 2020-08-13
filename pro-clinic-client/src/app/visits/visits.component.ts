import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { DateHelper } from 'src/shared/utils/classes/date-helper/date-helper';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { Visit } from '../dashboard/models/visit/visit';
import { VisitType } from './models/visit-type.enum';
import { SpinnerService } from 'src/shared/services/spinner/spinner.service';

@Component({
    selector: 'pc-visits',
    templateUrl: './visits.component.html',
    styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {
    public visits: Array<Visit> = new Array<Visit>();
    public columns = ['date', 'patientName', 'type', 'reason'];

    public currentDateLowerRange = moment().startOf('month');
    public currentDateUpperRange = moment();

    constructor(
        private route: ActivatedRoute,
        private dashboardService: DashboardService,
        private spinnerService: SpinnerService
    ) {}

    ngOnInit(): void {
        this.setVisitsFromResolver();
        this.setVisitTypeForVisits();
    }

    public getDate = (visit: Visit): string =>
        moment(visit.date.toDate()).format('hh:mm DD MMM, YYYY');

    public getCurrentDateLowerRange = (): string =>
        this.currentDateLowerRange.format('DD MMM, YYYY');

    public getCurrentDateUpperRange = (): string =>
        this.currentDateUpperRange.format('DD MMM, YYYY');

    private setVisitTypeForVisits(): void {
        this.visits = this.visits.map((visit: Visit) => {
            visit.type = this.getVisitType();
            return visit;
        });
    }

    // For testing purposes and to accommodate firebase read quotas, don't go below june
    public shouldHideBackButton = (): boolean =>
        this.currentDateLowerRange.get('month') === DateHelper.JuneMonthIndex;

    // Don't go above current month
    public shouldHideForwardButton = (): boolean =>
        DateHelper.IsCurrentMonth(this.currentDateUpperRange.toDate());

    public isDateUpperRangeToday = (): boolean =>
        DateHelper.IsCurrentDay(this.currentDateUpperRange.toDate()) &&
        DateHelper.IsCurrentMonth(this.currentDateUpperRange.toDate());

    public goMonthBack(): void {
        this.subtractMonth();
    }

    public goMonthForward(): void {
        this.addMonth();
    }

    private getVisits(): void {
        this.spinnerService.showSpinner();
        this.dashboardService
            .getVisits(
                this.currentDateLowerRange.toDate(),
                this.currentDateUpperRange.toDate()
            )
            .subscribe({
                next: (response: Array<Visit>) => {
                    this.visits = response;
                    this.setVisitTypeForVisits();
                    setTimeout(() => {
                        this.spinnerService.hideSpinner();
                    }, 1000);
                }
            });
    }

    private getVisitType(): string {
        const random = Math.floor(Math.random() * (3 - 0 + 1));
        console.log(random);
        switch (random) {
            case VisitType.Visit:
                return 'Visit';
            case VisitType.Emergency:
                return 'Emergency';
            case VisitType.Surgery:
                return 'Surgery';
            case VisitType.Hospitalization:
                return 'Hospitalization';
        }
    }

    private setVisitsFromResolver(): void {
        this.visits = this.route.snapshot.data.visits;
        console.log(this.visits);
    }

    private subtractMonth(): void {
        // TODO: Move more subtract/add startOf/endOf logic elsewhere
        this.currentDateLowerRange = this.currentDateLowerRange
            .subtract(1, 'months')
            .startOf('month');
        this.currentDateUpperRange = this.currentDateUpperRange
            .subtract(1, 'months')
            .endOf('month');

        this.getVisits();
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

        this.getVisits();
    }

    private isDateUpperRangeCurrentMonth = (): boolean =>
        this.currentDateUpperRange.isSameOrAfter(moment.utc());

    private setDateRangeUntilCurrentDay(): void {
        this.currentDateLowerRange = moment().startOf('month');
        this.currentDateUpperRange = moment();
    }
}
