import { Component } from '@angular/core'

@Component({
    selector: 'pc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public isMenuToggled = false;

    constructor() {}

    public toggleMenu(): void {
        this.isMenuToggled = !this.isMenuToggled;
    }
}
