import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { NumericoDirective } from './directives';

@NgModule({
  declarations: [
    NumericoDirective
  ],
  // imports: [
  //   CommonModule
  // ],
  exports: [
    NumericoDirective,
  ]
})
export class SharedModule { }
