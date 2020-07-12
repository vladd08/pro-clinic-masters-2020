import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { catchError, first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthenticationCredentials } from 'src/core/modules/login/models/authentication-credentials/authentication-credentials';
import { AuthenticationTokenService } from 'src/core/modules/login/services/authentication-token/authentication-token.service';
import { endpoints } from 'src/environments/endpoints';
import { GlobalSpinnerService } from 'src/shared/services/global-spinner/global-spinner.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private readonly logoutPeriodMs = 2000;
    private isSessionExpired = false;

    constructor(
        private httpClient: HttpClient,
        private cookieService: CookieService,
        private authenticationTokenService: AuthenticationTokenService,
        private router: Router,
        private globalSpinnerService: GlobalSpinnerService
    ) {}

    public authenticate = (
        authenticationCredentials: AuthenticationCredentials
    ): Observable<{}> =>
        this.httpClient
            .get(endpoints.authenticate(), {
                headers: {
                    Authentication: authenticationCredentials.getAuthenticationHeader()
                }
            })
            .pipe(this.getHttpOperators());

    public logout = (): void => {
        this.globalSpinnerService.showGlobalSpinner();
        this.authenticationTokenService.deleteAuthenticationTokens();

        this.router.navigateByUrl('/login/(login-step:step-one)');

        timer(this.logoutPeriodMs).subscribe({
            next: () => {
                this.globalSpinnerService.hideGlobalSpinner();
            }
        });
    };

    public authorizeOtp = (otp: string): Observable<{}> =>
        this.httpClient
            .get(endpoints.authorizeOtp(), {
                headers: {
                    otp,
                    Authorization: `Bearer ${this.cookieService.get(
                        'auth-token'
                    )}`
                }
            })
            .pipe(this.getHttpOperators());

    public isForciblyLoggedOut = (): boolean => this.isSessionExpired;

    public setIsForciblyLoggedOut(): void {
        this.isSessionExpired = true;
    }

    public resetIsForciblyLoggedOut(): void {
        this.isSessionExpired = false;
    }

    private getHttpOperators(): (observable: Observable<{}>) => Observable<{}> {
        return (
            first(),
            catchError((errorResponse: HttpErrorResponse) =>
                throwError({
                    message: errorResponse.error.message,
                    status: errorResponse.status
                })
            )
        );
    }
}
