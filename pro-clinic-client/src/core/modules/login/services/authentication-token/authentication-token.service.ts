import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationTokenType } from '../../models/authentication-token-type/authentication-token-type.enum';
import { DateHelper } from 'src/shared/utils/classes/date-helper/date-helper';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationTokenService {
    private readonly defaultCookiePath = '/';

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
        console.log(DateHelper.GetDateOneHourFromCurrent());
        this.cookieService.set(
            AuthenticationTokenType.FirstStep,
            token,
            DateHelper.GetDateOneHourFromCurrent(),
            '/'
        );
    }

    public authenticateSecondStep(token: string): void {
        if (!this.isFistStepAuthenticated()) return;

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
}
