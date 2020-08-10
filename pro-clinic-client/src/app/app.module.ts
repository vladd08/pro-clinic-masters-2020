import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/core/core.module';
import { SharedModule } from 'src/shared/shared.module';
import { InitService } from 'src/core/services/init/init.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShiftsComponent } from './shifts/shifts.component';

function init(initService: InitService) {
    return (): Promise<any> => {
        return initService.initializeApplication();
    };
}

@NgModule({
    declarations: [AppComponent, DashboardComponent, ShiftsComponent],
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
