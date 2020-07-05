import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { RestError } from 'src/shared/utils/interfaces/rest-error/rest-error';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {
    private readonly snackbarConfig: MatSnackBarConfig = {
        duration: 2000,
        horizontalPosition: 'left',
        verticalPosition: 'top'
    };
    private readonly snackbarActionText = 'Close';

    constructor(private snackbar: MatSnackBar) {}

    public notifyErrorSnackbar(error: RestError): void {
        const config = {
            ...this.snackbarConfig,
            panelClass: 'error-snackbar'
        };

        this.snackbar.open(error.message, this.snackbarActionText, config);
    }
}
