import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SecondaryTopbarComponent } from './components/secondary-topbar/secondary-topbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginModule } from './modules/login/login.module';

@NgModule({
    declarations: [
        TopbarComponent,
        SidebarComponent,
        SecondaryTopbarComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        SharedModule,
        BrowserAnimationsModule,
        RouterModule,
    ],
    exports: [
        TopbarComponent,
        SecondaryTopbarComponent,
        SidebarComponent,
        LoginModule,
    ],
})
export class CoreModule {}
