import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { StreamComponent } from './stream/stream.component';
import { StreamCaptureComponent } from './stream/stream-capture.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NotFoundComponent,
    BreadcrumbComponent,
    StreamComponent,
    StreamCaptureComponent
  ],
  declarations: [NotFoundComponent, BreadcrumbComponent, StreamComponent, StreamCaptureComponent]
})
export class SharedModule { }
