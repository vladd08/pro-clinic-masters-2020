import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'pc-login-second-step',
    templateUrl: './login-second-step.component.html',
    styleUrls: [
        './login-second-step.component.scss',
        '../login.component.scss',
    ],
})
export class LoginSecondStepComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    public goBack(): void {
        this.router.navigateByUrl('/login/(login-step:step-one)');
    }
}
