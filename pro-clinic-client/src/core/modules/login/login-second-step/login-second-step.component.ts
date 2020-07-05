import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { timer } from 'rxjs';

import { AuthenticationService } from 'src/core/services/authentication/authentication.service';
import { RestError } from 'src/shared/utils/interfaces/rest-error/rest-error';
import { SnackbarService } from 'src/shared/services/snackbar/snackbar.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
    selector: 'pc-login-second-step',
    templateUrl: './login-second-step.component.html',
    styleUrls: ['./login-second-step.component.scss', '../login.component.scss']
})
export class LoginSecondStepComponent {
    public oneTimePassword = '';
    public isLoading = false;

    private readonly firebaseSigninErrorMessage =
        'OTP validation was successful, but something was wrong when attempting to connect to Firebase.';

    constructor(
        private router: Router,
        private cookieService: CookieService,
        private authenticationService: AuthenticationService,
        private firebaseAuth: AngularFireAuth,
        private snackbarService: SnackbarService
    ) {}

    public goBack(): void {
        this.router.navigateByUrl('/login/(login-step:step-one)');
    }

    public onSubmit(): void {
        this.isLoading = true;
        this.authenticationService
            .authorizeOtp(this.oneTimePassword)
            .subscribe({
                next: (response: { token: string }) => {
                    this.cookieService.delete('auth-token');
                    this.cookieService.set('token', response.token);

                    this.signInToFirebase(response.token);
                },
                error: (err: RestError): void => {
                    timer(2000).subscribe({
                        next: () => {
                            this.isLoading = false;
                            this.snackbarService.notifyErrorSnackbar(err);
                        }
                    });
                }
            });
    }

    private signInToFirebase(token: string): void {
        this.firebaseAuth
            .signInWithCustomToken(token)
            .then((resp) => {
                timer(2000).subscribe({
                    next: () => {
                        console.log(resp);
                        this.isLoading = false;
                    }
                });
            })
            .catch(() => {
                this.isLoading = false;

                this.snackbarService.notifyErrorSnackbar({
                    message: this.firebaseSigninErrorMessage,
                    status: 400
                });
            });
    }
}
