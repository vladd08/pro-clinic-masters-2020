import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/core/guards/auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmergenciesResolver } from './dashboard/resolvers/emergencies.resolver';
import { NotFoundComponent } from 'src/core/components/not-found/not-found.component';
import { ShiftsResolver } from './dashboard/resolvers/shifts.resolver';
import { VisitsResolver } from './dashboard/resolvers/visits.resolver';
import { WorkedHoursResolver } from './dashboard/resolvers/worked-hours.resolver';

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
