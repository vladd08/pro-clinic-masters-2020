import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './modules/material/material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
  ]
})
export class SharedModule { }
