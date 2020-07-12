import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

import { AuthenticationTokenService } from '../services/authentication-token/authentication-token.service';
import { AuthenticationService } from 'src/core/services/authentication/authentication.service';
import { GlobalSpinnerService } from 'src/shared/services/global-spinner/global-spinner.service';
import { RestError } from 'src/shared/utils/interfaces/rest-error/rest-error';
import { SnackbarService } from 'src/shared/services/snackbar/snackbar.service';

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

    private readonly loginPeriodMs = 1500;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private firebaseAuth: AngularFireAuth,
        private snackbarService: SnackbarService,
        private authenticationTokenService: AuthenticationTokenService,
        private globalSpinnerService: GlobalSpinnerService
    ) {}

    public goBack(): void {
        this.authenticationTokenService.deleteAuthenticationTokens();
        this.router.navigateByUrl('/login/(login-step:step-one)');
    }

    public onSubmit(): void {
        this.isLoading = true;
        this.authenticationService
            .authorizeOtp(this.oneTimePassword)
            .subscribe({
                next: (response: { token: string }) => {
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
                        this.authenticationTokenService.authenticateSecondStep(
                            token
                        );

                        this.authenticationService.resetIsForciblyLoggedOut();

                        this.router.navigate(['dashboard']).then(() => {
                            this.globalSpinnerService.showGlobalSpinner();
                            timer(this.loginPeriodMs).subscribe({
                                next: () => {
                                    this.globalSpinnerService.hideGlobalSpinner();
                                }
                            });
                        });
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
