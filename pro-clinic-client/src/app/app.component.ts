import { Component } from '@angular/core';

import { AuthenticationTokenService } from 'src/core/modules/login/services/authentication-token/authentication-token.service';

@Component({
    selector: 'pc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private authenticationTokenService: AuthenticationTokenService
    ) {}
}
