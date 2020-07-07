import { Injectable } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';

import { AuthenticationService } from '../authentication/authentication.service';
import { DateHelper } from 'src/shared/utils/classes/date-helper/date-helper';

@Injectable({
    providedIn: 'root'
})
export class IdleService {
    private readonly idlePeriodSeconds = DateHelper.SecondsInAHour;
    private readonly timeoutPeriodSeconds = DateHelper.SecondsInAMinute;
    private readonly pingPeriodSeconds = 5;
    private pageTitle: string;

    constructor(
        private idle: Idle,
        private keepalive: Keepalive,
        private authenticationService: AuthenticationService,
        private titleService: Title
    ) {}

    public start(): void {
        this.initializeIdlingProcess();
        this.setPageTitle();
    }

    private initializeIdlingProcess(): void {
        console.log('initialize idle');
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
                console.log(countdonw);
                this.titleService.setTitle(
                    `Logging out in ${moment
                        .utc(countdonw * 1000)
                        .format('mm:ss')}`
                );
            }
        });
    }

    private handleIdleEnd(): void {
        this.idle.onIdleEnd.subscribe({
            next: () => {
                this.resetPageTitle();
            }
        });
    }

    private handleIdleTimeout(): void {
        this.idle.onTimeout.subscribe({
            next: () => {
                this.authenticationService.logout();
                this.resetPageTitle();
            }
        });
    }

    private resetPageTitle(): void {
        this.titleService.setTitle(this.pageTitle);
    }

    private setPageTitle(): void {
        this.pageTitle = this.titleService.getTitle();
    }
}
