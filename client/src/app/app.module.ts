import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './features/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { LayoutComponent } from './features/layout/layout.component';
import { HomeComponent } from './features/home/home.component';
import { SpectatorComponent } from './features/spectator/spectator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './features/auth/auth.interceptor';
import { DeviceModule } from './features/device/device.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    SpectatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    AuthModule,
    DeviceModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
