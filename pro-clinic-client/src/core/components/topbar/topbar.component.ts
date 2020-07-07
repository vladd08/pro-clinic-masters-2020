import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/core/services/authentication/authentication.service';
import { AuthenticationTokenService } from 'src/core/modules/login/services/authentication-token/authentication-token.service';
import { DrawerService } from '../sidebar/services/drawer/drawer.service';

@Component({
    selector: 'pc-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
    constructor(
        private drawerService: DrawerService,
        private authenticationTokenService: AuthenticationTokenService,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit(): void {}

    public isAuthenticated = (): boolean =>
        this.authenticationTokenService.isSecondStepAuthenticated();

    public logout(): void {
        this.authenticationService.logout();
    }

    public toggleDrawer(): void {
        this.drawerService.isDrawerOpen()
            ? this.drawerService.closeDrawer()
            : this.drawerService.openDrawer();
    }
}
