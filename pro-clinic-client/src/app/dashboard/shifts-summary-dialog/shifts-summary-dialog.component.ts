import { Component, OnInit, Inject } from '@angular/core';
import { Shift } from '../models/shift/shift';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateHelper } from 'src/shared/utils/classes/date-helper/date-helper';
import { ShiftsService } from 'src/app/shifts/services/shifts.service';

@Component({
    selector: 'pc-shifts-summary-dialog',
    templateUrl: './shifts-summary-dialog.component.html',
    styleUrls: ['./shifts-summary-dialog.component.scss']
})
export class ShiftsSummaryDialogComponent implements OnInit {
    public shifts: Array<Shift>;
    public date: string;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { shifts: Array<Shift>; date: string },
        private shiftService: ShiftsService
    ) {}

    ngOnInit(): void {
        this.setShiftsFromData();
        this.setDateFromData();
    }

    public getPayment = (shift: Shift): number =>
        this.shiftService.getPayment(shift);

    public getTotalHours = (): number =>
        this.shiftService.getTotalHours(this.shifts);

    public getTotalPayment = (): number =>
        this.shiftService.getTotalPayment(this.shifts);

    public getHourlyRate = (): number => this.shiftService.getHourlyRate();

    public getWeekendHourlyRate = (): number =>
        this.shiftService.getWeekendHourlyRate();

    private setShiftsFromData(): void {
        this.shifts = this.data.shifts;
    }

    private setDateFromData(): void {
        this.date = this.data.date;
    }
}
