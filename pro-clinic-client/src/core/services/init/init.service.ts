import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class InitService {
    constructor() {}

    public initializeApplication(): Promise<any> {
        return of().pipe(delay(2000)).toPromise();
    }
}
