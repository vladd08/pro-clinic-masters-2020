import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DrawerService {
    private isOpen = true;

    constructor() {}

    public openDrawer(): void {
        this.isOpen = true;
    }

    public closeDrawer(): void {
        this.isOpen = false;
    }

    public isDrawerOpen = (): boolean => this.isOpen;
}
