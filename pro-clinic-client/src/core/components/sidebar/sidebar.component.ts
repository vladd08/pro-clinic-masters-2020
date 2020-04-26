import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/core/services/authentication/authentication-service.service';

@Component({
    selector: 'pc-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    constructor(private authenticationService: AuthenticationService) {}

    ngOnInit(): void {}

    public isAuthenticated(): boolean {
        return this.authenticationService.isAuthenticated();
    }
}
