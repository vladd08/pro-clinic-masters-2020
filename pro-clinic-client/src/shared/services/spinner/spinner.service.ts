import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {
    private displayed = false;

    public isSpinnerDisplayed = (): boolean => this.displayed;

    public showSpinner(): void {
        this.displayed = true;
    }

    public hideSpinner(): void {
        this.displayed = false;
    }
}
