import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginFirstStepComponent } from './login-first-step/login-first-step.component';
import { LoginSecondStepComponent } from './login-second-step/login-second-step.component';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
    declarations: [
        LoginComponent,
        LoginFirstStepComponent,
        LoginSecondStepComponent
    ],
    imports: [LoginRoutingModule, SharedModule, FormsModule],
    exports: [LoginComponent]
})
export class LoginModule {}
