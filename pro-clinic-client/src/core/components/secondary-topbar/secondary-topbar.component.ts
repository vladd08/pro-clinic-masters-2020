import { Component } from '@angular/core';
import { PageNameService } from 'src/shared/services/page-name/page-name.service';

@Component({
    selector: 'pc-secondary-topbar',
    templateUrl: './secondary-topbar.component.html',
    styleUrls: ['./secondary-topbar.component.scss']
})
export class SecondaryTopbarComponent {
    constructor(private pageNameSerice: PageNameService) {}

    public getPageName = (): string => this.pageNameSerice.getCurrentPageName();
}
