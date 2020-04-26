import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'pc-login-first-step',
    templateUrl: './login-first-step.component.html',
    styleUrls: ['./login-first-step.component.scss', '../login.component.scss'],
})
export class LoginFirstStepComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    public onSubmit(): void {
        this.router.navigateByUrl('/login/(login-step:step-two)');
    }
}
