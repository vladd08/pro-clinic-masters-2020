import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './modules/login/login.module';
import { SharedModule } from 'src/shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SecondaryTopbarComponent } from './components/secondary-topbar/secondary-topbar.component';
import { TopbarComponent } from './components/topbar/topbar.component';

@NgModule({
    declarations: [
        TopbarComponent,
        SidebarComponent,
        SecondaryTopbarComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        SharedModule,
        BrowserAnimationsModule,
        RouterModule,
        HttpClientModule
    ],
    exports: [
        HttpClientModule,
        TopbarComponent,
        SecondaryTopbarComponent,
        SidebarComponent,
        LoginModule
    ],
    providers: [CookieService]
})
export class CoreModule {}
