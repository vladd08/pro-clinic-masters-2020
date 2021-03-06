import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitializeGuard } from 'src/core/guards/initialize/initialize.guard';

import { LoginComponent } from './login.component';
import { LoginFirstStepComponent } from './login-first-step/login-first-step.component';
import { LoginSecondStepComponent } from './login-second-step/login-second-step.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [InitializeGuard],
        children: [
            {
                path: 'step-one',
                component: LoginFirstStepComponent,
                outlet: 'login-step',
                data: {
                    pageName: 'Login Step #1'
                }
            },
            {
                path: 'step-two',
                component: LoginSecondStepComponent,
                outlet: 'login-step',
                data: {
                    pageName: 'Login Step #2'
                }
            },
            {
                path: '',
                redirectTo: '/login/(login-step:step-one)',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {}
