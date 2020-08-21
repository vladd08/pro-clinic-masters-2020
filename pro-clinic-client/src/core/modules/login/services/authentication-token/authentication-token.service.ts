import { Injectable } from '@angular/core';

import { AuthenticationTokenType } from '../../models/authentication-token-type/authentication-token-type.enum';
import { CookieService } from 'ngx-cookie-service';
import { DateHelper } from 'src/shared/utils/classes/date-helper/date-helper';
import { AuthenticationCredentials } from '../../models/authentication-credentials/authentication-credentials';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationTokenService {
    private readonly defaultCookiePath = '/';
    private readonly adminEmail = 'admin@proclinic.com';
    private readonly adminPassword = 'adminproclinic';

    constructor(private cookieService: CookieService) {}

    public isFistStepAuthenticated(): boolean {
        return Boolean(
            this.cookieService.get(AuthenticationTokenType.FirstStep)
        );
    }

    public isSecondStepAuthenticated(): boolean {
        return Boolean(
            this.cookieService.get(AuthenticationTokenType.SecondStep)
        );
    }

    public authenticateFirstStep(token: string): void {
        this.cookieService.set(
            AuthenticationTokenType.FirstStep,
            token,
            DateHelper.GetDateOneHourFromCurrent(),
            '/'
        );
    }

    public authenticateSecondStep(
        token: string,
        credentials: firebase.auth.UserCredential
    ): void {
        if (
            !this.isFistStepAuthenticated() &&
            !this.isAdministrator(credentials)
        )
            return;

        // TODO: Extract code
        this.cookieService.delete(
            AuthenticationTokenType.FirstStep,
            this.defaultCookiePath
        );
        this.cookieService.set(
            AuthenticationTokenType.SecondStep,
            token,
            DateHelper.GetDateOneHourFromCurrent(),
            this.defaultCookiePath
        );
        // TODO: Shouldn't do this. Get user id and expose a getUserById endpoint to call when needed
        // Also, create a user model for cookie storage
        this.cookieService.set(
            'email',
            credentials.user.email,
            DateHelper.GetDateOneHourFromCurrent(),
            this.defaultCookiePath
        );

        this.cookieService.set(
            'uid',
            credentials.user.uid,
            DateHelper.GetDateOneHourFromCurrent(),
            this.defaultCookiePath
        );
    }

    public deleteAuthenticationTokens(): void {
        if (this.isFistStepAuthenticated()) {
            this.cookieService.delete(
                AuthenticationTokenType.FirstStep,
                this.defaultCookiePath
            );
        }

        if (this.isSecondStepAuthenticated()) {
            this.cookieService.delete(
                AuthenticationTokenType.SecondStep,
                this.defaultCookiePath
            );
        }
    }

    // TODO: Maybe we can do this from start without the method above
    public deleteUserCookies(): void {
        this.cookieService.deleteAll();
    }

    private isAdministrator = (
        authenticationCredentials: firebase.auth.UserCredential
    ): boolean => authenticationCredentials.user.email === this.adminEmail;
}
