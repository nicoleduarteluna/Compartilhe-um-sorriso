import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MinhasMensagensComponent } from './minhas-mensagens.component';

@NgModule({
  declarations: [ MinhasMensagensComponent
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
  exports: [ MinhasMensagensModule ],
  providers: [],
  bootstrap: []
})
export class MinhasMensagensModule { }
