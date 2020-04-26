import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { SharedModule } from 'src/shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginFirstStepComponent } from './login-first-step/login-first-step.component';
import { LoginSecondStepComponent } from './login-second-step/login-second-step.component';

@NgModule({
    declarations: [LoginComponent, LoginFirstStepComponent, LoginSecondStepComponent],
    imports: [LoginRoutingModule, SharedModule],
    exports: [LoginComponent],
})
export class LoginModule {}
