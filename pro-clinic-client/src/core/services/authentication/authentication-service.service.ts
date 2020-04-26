import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private isUserAuthenticated = false;

    constructor() {}

    public isAuthenticated(): boolean {
        return this.isUserAuthenticated;
    }
}
