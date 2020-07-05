import { Component, OnInit } from '@angular/core';

import { IdleService } from 'src/core/services/idle/idle.service';

@Component({
    selector: 'pc-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    constructor(private idleService: IdleService) {}

    ngOnInit(): void {
        this.idleService.start();
    }
}
