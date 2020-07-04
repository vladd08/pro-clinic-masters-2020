export class AuthenticationCredentials {
    constructor(public email: string = '', public password: string = '') {}

    public getAuthenticationHeader = (): string =>
        `Basic ${btoa(`${this.email} \n${this.password} \n`)}`;
}
