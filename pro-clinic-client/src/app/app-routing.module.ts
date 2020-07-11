import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/core/guards/auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from 'src/core/components/not-found/not-found.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {
            topbarTitle: 'Dashboard'
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
            topbarTitle: 'Not Found'
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
