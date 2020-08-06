import { Component } from '@angular/core';
import {
    trigger,
    transition,
    style,
    animate,
    state
} from '@angular/animations';

import { AuthenticationTokenService } from 'src/core/modules/login/services/authentication-token/authentication-token.service';
import { GlobalSpinnerService } from 'src/shared/services/global-spinner/global-spinner.service';
import { SidebarService } from 'src/shared/services/sidebar/sidebar.service';
import { SpinnerService } from 'src/shared/services/spinner/spinner.service';

@Component({
    selector: 'pc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    // TODO: Move those somewhere else, something tells me this ain't their place in here
    animations: [
        trigger('blockInitialAnimation', [transition(':enter', [])]),
        trigger('slideInOut', [
            transition(':enter', [
                style({ transform: 'translateX(-100%)' }),
                animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
            ]),
            transition(':leave', [
                animate(
                    '300ms ease-in',
                    style({ transform: 'translateX(-100%)' })
                )
            ])
        ]),
        trigger('followUp', [
            state('false', style({})),
            state('true', style({})),
            transition('true => false', [
                style({ transform: 'translateX(0px)' }),
                animate(
                    '300ms ease-in',
                    style({ transform: 'translateX(-280px)' })
                )
            ]),
            transition('false => true', [
                style({ transform: 'translateX(-280px)' }),
                animate(
                    '300ms ease-in',
                    style({ transform: 'translateX(0px)' })
                )
            ])
        ])
    ]
})
export class AppComponent {
    constructor(
        private authenticationTokenService: AuthenticationTokenService,
        private sidebarService: SidebarService,
        private globalSpinnerService: GlobalSpinnerService,
        private spinnerService: SpinnerService
    ) {}

    public isSpinnerDisplayed = (): boolean =>
        this.spinnerService.isSpinnerDisplayed();

    public isAuthenticated = (): boolean =>
        this.authenticationTokenService.isSecondStepAuthenticated();

    public isSidebarOpen = (): boolean => this.sidebarService.isSidebarOpen();

    public shouldShowGlobalSpinner = (): boolean =>
        this.globalSpinnerService.isGlobalSpinnerShown();
}
