import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    NotFoundComponent
  ],
  declarations: [NotFoundComponent]
})
export class SharedModule { }
