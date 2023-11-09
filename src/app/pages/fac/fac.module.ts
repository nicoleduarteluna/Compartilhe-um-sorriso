import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FacComponent } from './fac.component';

@NgModule({
  declarations: [ FacComponent
   ],
  imports: [
    BrowserModule,
    CommonModule,
    PoModule,
    RouterModule,
    PoTemplatesModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [ FacComponent ],
  providers: [],
  bootstrap: []
})
export class FacModule { }
