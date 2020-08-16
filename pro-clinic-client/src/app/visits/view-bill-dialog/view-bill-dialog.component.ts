import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

import { Visit } from 'src/app/dashboard/models/visit/visit';
import { StorageService } from 'src/shared/services/storage/storage.service';
import { BillService } from '../services/bill.service';

@Component({
    selector: 'pc-view-bill-dialog',
    templateUrl: './view-bill-dialog.component.html',
    styleUrls: ['./view-bill-dialog.component.scss']
})
export class ViewBillDialogComponent implements OnInit {
    public visit: Visit = new Visit();

    constructor(
        public dialogRef: MatDialogRef<ViewBillDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { visit: Visit },
        private storageService: StorageService,
        private billService: BillService
    ) {}

    ngOnInit(): void {
        this.setVisit();
    }

    public downloadBill(): void {
        this.billService.downloadBill(this.visit);
        this.dialogRef.close();
    }

    public getDate = (): string =>
        moment(this.visit.date.toDate()).format('hh:mm DD MMM, YYYY');

    private setVisit(): void {
        this.visit = this.data.visit;
    }
}
