import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalSpinnerService {
    private isShown = false;

    constructor() {}

    public isGlobalSpinnerShown = (): boolean => this.isShown;

    public showGlobalSpinner(): void {
        this.isShown = true;
    }

    public hideGlobalSpinner(): void {
        this.isShown = false;
    }
}
