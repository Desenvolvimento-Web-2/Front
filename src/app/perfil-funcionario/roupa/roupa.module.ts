import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { RoupaService } from './services/roupa.service';
import { ListarRoupaComponent } from './listar-roupa/listar-roupa.component';
import { InserirEditarRoupaComponent } from './inserir-editar-roupa/inserir-editar-roupa.component';
import { SharedModule } from 'src/app/shared';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [  
    ListarRoupaComponent,
    InserirEditarRoupaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    RoupaService,
    provideNgxMask(),
  ]
})
export class RoupaModule { }