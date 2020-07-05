import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';

import { AuthenticationTokenService } from 'src/core/modules/login/services/authentication-token/authentication-token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authenticationTokenService: AuthenticationTokenService,
        private router: Router
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (this.authenticationTokenService.isSecondStepAuthenticated()) {
            return true;
        }

        this.router.navigateByUrl('/login/(login-step:step-one)');
    }
}
