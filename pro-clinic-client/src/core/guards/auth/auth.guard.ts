import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationTokenService } from 'src/core/modules/login/services/authentication-token/authentication-token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authenticationTokenService: AuthenticationTokenService,
        private router: Router
    ) {}

    // TODO: This is not enough. It should be passed through a FirebaseAuth authguard as well
    canActivate(): boolean {
        if (this.authenticationTokenService.isSecondStepAuthenticated()) {
            return true;
        }

        this.router.navigateByUrl('/login/(login-step:step-one)');
    }
}
