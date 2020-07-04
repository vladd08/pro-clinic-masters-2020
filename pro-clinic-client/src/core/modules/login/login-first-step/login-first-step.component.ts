import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { AuthenticationService } from 'src/core/services/authentication/authentication.service';
import { AuthenticationCredentials } from '../models/authentication-credentials/authentication-credentials';

@Component({
    selector: 'pc-login-first-step',
    templateUrl: './login-first-step.component.html',
    styleUrls: ['./login-first-step.component.scss', '../login.component.scss']
})
export class LoginFirstStepComponent {
    public authenticationCredentials: AuthenticationCredentials = new AuthenticationCredentials();

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private cookieService: CookieService
    ) {}

    public onSubmit(): void {
        console.log(this.authenticationCredentials);
        console.log(this.authenticationCredentials.getAuthenticationHeader());
        this.authenticationService
            .authenticate(this.authenticationCredentials)
            .subscribe({
                next: (response: any) => {
                    console.log(response);
                    this.cookieService.set('auth-token', response.token);
                    this.router.navigateByUrl('/login/(login-step:step-two)');
                },
                error: (err) => {
                    console.log(err);
                }
            });
    }
}
