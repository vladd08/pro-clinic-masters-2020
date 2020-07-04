import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { AuthenticationCredentials } from 'src/core/modules/login/models/authentication-credentials/authentication-credentials';
import { endpoints } from 'src/environments/endpoints';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private isUserAuthenticated = false;

    constructor(
        private httpClient: HttpClient,
        private cookieService: CookieService
    ) {}

    public isAuthenticated(): boolean {
        return this.isUserAuthenticated;
    }

    public authenticate = (
        authenticationCredentials: AuthenticationCredentials
    ): Observable<{}> =>
        this.httpClient.get(endpoints.authenticate(), {
            headers: {
                Authentication: authenticationCredentials.getAuthenticationHeader()
            }
        });

    public authorizeOtp = (otp: string): Observable<{}> =>
        this.httpClient.get(endpoints.authorizeOtp(), {
            headers: {
                otp,
                Authorization: `Bearer ${this.cookieService.get('auth-token')}`
            }
        });
}
