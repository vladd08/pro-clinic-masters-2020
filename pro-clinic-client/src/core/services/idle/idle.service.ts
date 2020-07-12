import { Injectable } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import * as moment from 'moment';

import { AuthenticationService } from '../authentication/authentication.service';
import { DateHelper } from 'src/shared/utils/classes/date-helper/date-helper';
import { PageNameService } from 'src/shared/services/page-name/page-name.service';
import { TitleService } from 'src/shared/services/title-service/title.service';

@Injectable({
    providedIn: 'root'
})
export class IdleService {
    private readonly idlePeriodSeconds = DateHelper.SecondsInAHour;
    private readonly timeoutPeriodSeconds = DateHelper.SecondsInAMinute;
    private readonly pingPeriodSeconds = 5;

    constructor(
        private idle: Idle,
        private keepalive: Keepalive,
        private authenticationService: AuthenticationService,
        private titleService: TitleService,
        private pageNameService: PageNameService
    ) {}

    public start(): void {
        this.initializeIdlingProcess();
    }

    public stop(): void {
        this.idle.stop();
    }

    private initializeIdlingProcess(): void {
        this.idle.setIdle(this.idlePeriodSeconds);
        this.idle.setTimeout(this.timeoutPeriodSeconds);
        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
        this.keepalive.interval(this.pingPeriodSeconds);

        this.handleIdleTimeoutWarning();
        this.handleIdleTimeout();
        this.handleIdleEnd();

        this.idle.watch();
    }

    private handleIdleTimeoutWarning(): void {
        this.idle.onTimeoutWarning.subscribe({
            next: (countdonw: number) => {
                this.setTimeoutWarningTitle(
                    moment.utc(countdonw * 1000).format('mm:ss')
                );
            }
        });
    }

    private handleIdleEnd(): void {
        this.idle.onIdleEnd.subscribe({
            next: () => {
                this.pageNameService.setPageTitleAsCurrentPageName();
            }
        });
    }

    private handleIdleTimeout(): void {
        this.idle.onTimeout.subscribe({
            next: () => {
                this.authenticationService.logout();
                this.stop();
                this.pageNameService.setSessionExpiredTitle();
            }
        });
    }

    private setTimeoutWarningTitle(period: string): void {
        this.titleService.setTitle(`Logging out in ${period}`);
    }
}
