import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { timer } from 'rxjs';

import { AuthenticationService } from 'src/core/services/authentication/authentication.service';
import { AuthenticationCredentials } from '../models/authentication-credentials/authentication-credentials';
import { SnackbarService } from 'src/shared/services/snackbar/snackbar.service';
import { RestError } from 'src/shared/utils/interfaces/rest-error/rest-error';

@Component({
    selector: 'pc-login-first-step',
    templateUrl: './login-first-step.component.html',
    styleUrls: ['./login-first-step.component.scss', '../login.component.scss']
})
export class LoginFirstStepComponent {
    public authenticationCredentials: AuthenticationCredentials = new AuthenticationCredentials();
    public isLoading = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private cookieService: CookieService,
        private snackbarService: SnackbarService
    ) {}

    public onSubmit(): void {
        this.isLoading = true;
        this.authenticationService
            .authenticate(this.authenticationCredentials)
            .subscribe({
                next: (response: { token: string }) => {
                    this.cookieService.set('auth-token', response.token);
                    timer(2000).subscribe({
                        next: () => {
                            this.isLoading = false;
                            this.router.navigateByUrl(
                                '/login/(login-step:step-two)'
                            );
                        }
                    });
                },
                error: (err: RestError) => {
                    timer(2000).subscribe({
                        next: () => {
                            this.isLoading = false;
                            this.snackbarService.notifyErrorSnackbar(err);
                        }
                    });
                }
            });
    }
}
