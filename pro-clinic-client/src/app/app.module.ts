import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CoreModule } from 'src/core/core.module'
import { SharedModule } from 'src/shared/shared.module'

@NgModule({
    declarations: [AppComponent],
    imports: [CoreModule, SharedModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
