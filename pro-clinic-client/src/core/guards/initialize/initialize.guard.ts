import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationTokenService } from 'src/core/modules/login/services/authentication-token/authentication-token.service';

@Injectable({
    providedIn: 'root'
})
export class InitializeGuard implements CanActivate {
    constructor(
        private authenticationTokenService: AuthenticationTokenService,
        private router: Router
    ) {}

    canActivate(): boolean {
        if (!this.authenticationTokenService.isSecondStepAuthenticated()) {
            return true;
        }

        this.router.navigate(['/dashboard']);
    }
}
