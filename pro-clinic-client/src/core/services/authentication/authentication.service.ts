import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { catchError, first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthenticationCredentials } from 'src/core/modules/login/models/authentication-credentials/authentication-credentials';
import { AuthenticationTokenService } from 'src/core/modules/login/services/authentication-token/authentication-token.service';
import { endpoints } from 'src/environments/endpoints';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(
        private httpClient: HttpClient,
        private cookieService: CookieService,
        private authenticationTokenService: AuthenticationTokenService,
        private router: Router
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
        this.authenticationTokenService.deleteAuthenticationTokens();
        this.router.navigateByUrl('/login/(login-step:step-one)');
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
