import { Component, OnInit } from '@angular/core';

import { AuthenticationTokenService } from 'src/core/modules/login/services/authentication-token/authentication-token.service';

@Component({
    selector: 'pc-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    constructor(
        private authenticationTokenService: AuthenticationTokenService
    ) {}

    ngOnInit(): void {}

    public isAuthenticated(): boolean {
        return this.authenticationTokenService.isSecondStepAuthenticated();
    }
}
