import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { WorkingHoursService } from 'src/shared/services/working-hours/working-hours.service';

@Injectable({
    providedIn: 'root'
})
export class WorkedHoursResolver implements Resolve<number> {
    constructor(private workedHoursService: WorkingHoursService) {}

    public resolve = (): Observable<number> =>
        this.workedHoursService.getWorkedHours();
}
