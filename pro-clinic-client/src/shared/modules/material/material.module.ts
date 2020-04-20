import { NgModule } from '@angular/core'

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatRippleModule } from '@angular/material/core'
import { MatSidenavModule } from '@angular/material/sidenav'

@NgModule({
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatRippleModule,
        MatSidenavModule,
    ],
})
export class MaterialModule {}
