import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/core/guards/auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmergenciesResolver } from './dashboard/resolvers/emergencies.resolver';
import { NotFoundComponent } from 'src/core/components/not-found/not-found.component';
import { ShiftsResolver } from './dashboard/resolvers/shifts.resolver';
import { ShiftsComponent } from './shifts/shifts.component';
import { ShiftOngoingResolver } from './shifts/resolvers/shift-ongoing.resolver';
import { VisitsResolver } from './dashboard/resolvers/visits.resolver';
import { WorkedHoursResolver } from './dashboard/resolvers/worked-hours.resolver';
import { VisitsComponent } from './visits/visits.component';
const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {
            pageName: 'Dashboard'
        },
        resolve: {
            visits: VisitsResolver,
            shifts: ShiftsResolver,
            emergencies: EmergenciesResolver,
            workedHours: WorkedHoursResolver
        }
    },
    {
        path: 'visits',
        component: VisitsComponent,
        canActivate: [AuthGuard],
        data: {
            pageName: 'Visits'
        },
        resolve: {
            visits: VisitsResolver
        }
    },
    {
        path: 'shifts',
        component: ShiftsComponent,
        canActivate: [AuthGuard],
        data: {
            pageName: 'Shifts'
        },
        resolve: {
            shiftData: ShiftOngoingResolver
        }
    },
    {
        path: '',
        redirectTo: '/login/(login-step:step-one)',
        pathMatch: 'full'
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
        data: {
            pageName: 'Not Found'
        }
    },
    {
        path: '**',
        redirectTo: '/not-found',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
