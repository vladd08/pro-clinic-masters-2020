import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'pc-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
    @Output() toggleMenu = new EventEmitter<void>()

    constructor() {}

    ngOnInit(): void {}

    public toggle(): void {
        this.toggleMenu.emit()
    }
}
