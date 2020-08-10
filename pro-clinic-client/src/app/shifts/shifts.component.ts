import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { ActivatedRoute } from '@angular/router';
import { ShiftsService } from './services/shifts.service';
import { Shift } from '../dashboard/models/shift/shift';

@Component({
    selector: 'pc-shifts',
    templateUrl: './shifts.component.html',
    styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent implements OnInit {
    public isShiftOngoing = false;
    public hours = 1;
    public isLoading = false;
    public started: string;
    public ending: string;

    private readonly loadingPeriodMs = 2000;

    constructor(
        private route: ActivatedRoute,
        private shiftsService: ShiftsService
    ) {}

    ngOnInit(): void {
        this.setIsShiftOngoingFromResolver();
    }

    public start(): void {
        this.shiftsService.startShift(this.hours).then(() => {
            this.refresh();
        });
    }

    private refresh(): void {
        this.isLoading = true;
        this.shiftsService.isShiftOngoing().subscribe({
            next: (response: { isOngoing: boolean; shift: Shift }) => {
                this.setDates(response);
                setTimeout(() => {
                    this.isLoading = false;
                }, this.loadingPeriodMs);
            }
        });
    }

    private setIsShiftOngoingFromResolver(): void {
        this.isShiftOngoing = this.route.snapshot.data.shiftData.isOngoing;
        if (this.isShiftOngoing) {
            this.setDates(this.route.snapshot.data.shiftData);
        }
    }

    private setDates(shiftData: { isOngoing: boolean; shift: Shift }): void {
        this.isShiftOngoing = shiftData.isOngoing;
        this.started = moment(shiftData.shift.date.toDate()).format(
            'hh:mm @ DD MMM, YYYY'
        );
        this.ending = moment(shiftData.shift.date.toDate())
            .add(shiftData.shift.hours, 'hour')
            .format('hh:mm @ DD MMM, YYYY');
    }
}
