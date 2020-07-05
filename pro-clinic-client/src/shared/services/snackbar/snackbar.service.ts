import { Injectable, Component } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarConfig,
    MatSnackBarRef
} from '@angular/material/snack-bar';
import { RestError } from 'src/shared/utils/interfaces/rest-error/rest-error';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {
    private readonly defaultToastSnackbarConfig: MatSnackBarConfig = {
        duration: 2000,
        horizontalPosition: 'left',
        verticalPosition: 'top'
    };
    private readonly snackbarActionText = 'Close';

    constructor(private snackbar: MatSnackBar) {}

    public notifyErrorSnackbar(error: RestError): void {
        const config = {
            ...this.defaultToastSnackbarConfig,
            panelClass: 'error-snackbar'
        };

        this.snackbar.open(error.message, this.snackbarActionText, config);
    }

    public openSnackbar<T>(
        component: ComponentType<T>,
        config: MatSnackBarConfig = {}
    ): MatSnackBarRef<T> {
        return this.snackbar.openFromComponent(component, config);
    }
}
