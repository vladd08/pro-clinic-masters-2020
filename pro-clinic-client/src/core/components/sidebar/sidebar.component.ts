import { Component, OnInit } from '@angular/core';

import { AuthenticationTokenService } from 'src/core/modules/login/services/authentication-token/authentication-token.service';
import { DrawerService } from './services/drawer/drawer.service';

@Component({
    selector: 'pc-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    constructor(
        private authenticationTokenService: AuthenticationTokenService,
        private drawerService: DrawerService
    ) {}

    ngOnInit(): void {}

    public isAuthenticated = (): boolean =>
        this.authenticationTokenService.isSecondStepAuthenticated();

    public isDrawerOpen = (): boolean =>
        this.drawerService.isDrawerOpen() && this.isAuthenticated();
}
