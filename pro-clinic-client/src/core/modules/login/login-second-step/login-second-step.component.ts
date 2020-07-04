import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { AuthenticationService } from 'src/core/services/authentication/authentication.service';

@Component({
    selector: 'pc-login-second-step',
    templateUrl: './login-second-step.component.html',
    styleUrls: ['./login-second-step.component.scss', '../login.component.scss']
})
export class LoginSecondStepComponent {
    public otp = '';

    constructor(
        private router: Router,
        private cookieService: CookieService,
        private authenticationService: AuthenticationService,
        private firebaseAuth: AngularFireAuth
    ) {}

    public goBack(): void {
        this.router.navigateByUrl('/login/(login-step:step-one)');
    }

    public onSubmit(): void {
        this.authenticationService.authorizeOtp(this.otp).subscribe({
            next: (response: any) => {
                console.log(response);
                this.cookieService.delete('auth-token');
                this.cookieService.set('token', response.token);
                this.firebaseAuth
                    .signInWithCustomToken(response.token)
                    .then((resp) => {
                        console.log(resp);
                    });
            },
            error: (err: any): void => {
                console.log(err);
            }
        });
    }
}
