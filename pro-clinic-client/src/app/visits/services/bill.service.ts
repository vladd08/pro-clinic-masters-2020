import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Visit } from 'src/app/dashboard/models/visit/visit';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class BillService {
    constructor() {}

    public downloadBill(visit: Visit): void {
        const doc = new jsPDF();

        const docTitle = `${visit.patientName}_${moment(
            visit.date.toDate()
        ).format('DD MMMM YYYY')}.pdf`;

        autoTable(doc, { html: '#billTable', theme: 'striped' });

        doc.save(docTitle);
    }
}
