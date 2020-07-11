import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

import { Router, RouterEvent, ActivationEnd } from '@angular/router';

@Component({
    selector: 'pc-secondary-topbar',
    templateUrl: './secondary-topbar.component.html',
    styleUrls: ['./secondary-topbar.component.scss']
})
export class SecondaryTopbarComponent implements OnInit {
    public currentPageTitle: string;

    constructor(private router: Router, private titleService: Title) {}

    ngOnInit(): void {
        this.handleRouterEvents();
    }

    private handleRouterEvents(): void {
        // TODO: Okay, I guess?
        // @ts-ignore
        this.router.events
            .pipe(
                filter((event: RouterEvent) => event instanceof ActivationEnd)
            )
            .subscribe({
                next: (event: ActivationEnd) => {
                    this.currentPageTitle = event.snapshot.data.topbarTitle;
                    if (!this.currentPageTitle) return;

                    this.titleService.setTitle(
                        `Pro Clinic | ${this.currentPageTitle}`
                    );
                }
            });
    }
}
