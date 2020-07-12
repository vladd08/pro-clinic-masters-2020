import { Component } from '@angular/core';

import { AuthenticationService } from 'src/core/services/authentication/authentication.service';
import { AuthenticationTokenService } from 'src/core/modules/login/services/authentication-token/authentication-token.service';
import { CookieService } from 'ngx-cookie-service';
import { IdleService } from 'src/core/services/idle/idle.service';
import { Router } from '@angular/router';
import { SidebarService } from 'src/shared/services/sidebar/sidebar.service';
@Component({
    selector: 'pc-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
    private readonly emailCookieKey = 'email';

    constructor(
        private authenticationTokenService: AuthenticationTokenService,
        private authenticationService: AuthenticationService,
        private sidebarService: SidebarService,
        private router: Router,
        private idleService: IdleService,
        private cookieService: CookieService
    ) {}

    public getUserEmail = (): string =>
        this.cookieService.get(this.emailCookieKey);

    public isAuthenticated = (): boolean =>
        this.authenticationTokenService.isSecondStepAuthenticated();

    public toggleSidebar(): void {
        this.sidebarService.isSidebarOpen()
            ? this.sidebarService.closeSidebar()
            : this.sidebarService.openSidebar();
    }

    public goToDashboard(): void {
        if (!this.isAuthenticated()) return;

        this.router.navigate(['dashboard']);
    }

    public logout(): void {
        this.idleService.stop();
        this.authenticationService.logout();
    }
}
