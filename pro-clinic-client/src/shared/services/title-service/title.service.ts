import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class TitleService {
    private readonly defaultTitle = 'Pro Clinic';

    constructor(private title: Title) {}

    public setTitle(title: string): void {
        this.title.setTitle(title);
    }

    public setTitleByPagename(pageName: string): void {
        this.title.setTitle(`${this.defaultTitle} | ${pageName}`);
    }
}
