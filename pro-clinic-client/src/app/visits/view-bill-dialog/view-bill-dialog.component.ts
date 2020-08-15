import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

import { Visit } from 'src/app/dashboard/models/visit/visit';

@Component({
    selector: 'pc-view-bill-dialog',
    templateUrl: './view-bill-dialog.component.html',
    styleUrls: ['./view-bill-dialog.component.scss']
})
export class ViewBillDialogComponent implements OnInit {
    public visit: Visit = new Visit();

    constructor(@Inject(MAT_DIALOG_DATA) public data: { visit: Visit }) {}

    ngOnInit(): void {
        this.setVisit();
    }

    public getDate = (): string =>
        moment(this.visit.date.toDate()).format('hh:mm DD MMM, YYYY');

    private setVisit(): void {
        this.visit = this.data.visit;
        console.log(this.visit);
    }
}
