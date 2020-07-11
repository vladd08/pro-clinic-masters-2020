import { Injectable } from '@angular/core';

import { AuthenticationTokenService } from 'src/core/modules/login/services/authentication-token/authentication-token.service';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    private isOpen = true;

    constructor(
        private authenticationTokenService: AuthenticationTokenService
    ) {}

    public isSidebarOpen = (): boolean =>
        this.isOpen &&
        this.authenticationTokenService.isSecondStepAuthenticated();

    public openSidebar(): void {
        this.isOpen = true;
    }

    public closeSidebar(): void {
        this.isOpen = false;
    }
}
