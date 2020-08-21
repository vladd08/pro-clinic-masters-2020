import { Component } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'pc-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    private readonly userEmailCookieKey = 'email';

    constructor(private cookieService: CookieService) {}

    public getUserEmail = (): string =>
        this.cookieService.get(this.userEmailCookieKey);

    public isAdministrator = (): boolean =>
        this.cookieService.get('email') === 'admin@proclinic.com';
}
