import { Injectable } from '@angular/core';
import { Router, RouterEvent, ActivationEnd } from '@angular/router';

import { TitleService } from '../title-service/title.service';
import { AuthenticationService } from 'src/core/services/authentication/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class PageNameService {
    private currentPageName: string;
    private readonly sessionExpiredPageTitle = 'Your session has expired';

    constructor(
        private router: Router,
        private titleService: TitleService,
        private authenticationService: AuthenticationService
    ) {
        this.handleRouterEvents();
    }

    public getCurrentPageName = (): string => this.currentPageName;

    public setPageTitleAsCurrentPageName(): void {
        this.titleService.setTitleByPagename(this.currentPageName);
    }

    public setSessionExpiredTitle(): void {
        this.authenticationService.setIsForciblyLoggedOut();
        this.titleService.setTitle(this.sessionExpiredPageTitle);
    }

    private handleRouterEvents(): void {
        this.router.events.subscribe({
            next: (event: RouterEvent) => {
                if (event instanceof ActivationEnd) {
                    console.log('event', event);
                    const pageName = event.snapshot.data.pageName;
                    this.currentPageName = pageName
                        ? pageName
                        : this.currentPageName;
                    console.log(this.currentPageName);
                    if (this.authenticationService.isForciblyLoggedOut())
                        return;

                    this.titleService.setTitleByPagename(this.currentPageName);
                }
            }
        });
    }
}
