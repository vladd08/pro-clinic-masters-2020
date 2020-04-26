import { Component } from '@angular/core';

import { AuthenticationService } from 'src/core/services/authentication/authentication-service.service';

@Component({
    selector: 'pc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private authenticationService: AuthenticationService) {}

    public isAuthenticated(): boolean {
        return this.authenticationService.isAuthenticated();
    }
}
