import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/core/core.module';
import { SharedModule } from 'src/shared/shared.module';
import { InitService } from 'src/core/services/init/init.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { VisitsComponent } from './visits/visits.component';
import { ViewBillDialogComponent } from './visits/view-bill-dialog/view-bill-dialog.component';
import { ShiftsSummaryDialogComponent } from './dashboard/shifts-summary-dialog/shifts-summary-dialog.component';

function init(initService: InitService) {
    return (): Promise<any> => {
        return initService.initializeApplication();
    };
}

@NgModule({
    declarations: [AppComponent, DashboardComponent, ShiftsComponent, VisitsComponent, ViewBillDialogComponent, ShiftsSummaryDialogComponent],
    imports: [CoreModule, SharedModule, AppRoutingModule],
    providers: [
        InitService,
        {
            provide: APP_INITIALIZER,
            useFactory: init,
            deps: [InitService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
