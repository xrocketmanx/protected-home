import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HomeComponent } from './features/home/home.component';
import { SpectatorComponent } from './features/spectator/spectator.component';
import { DeviceTransmissionComponent } from './features/device/device-transmission/device-transmission.component';
import { AuthGuard } from './features/auth/auth.guard';
import { DevicesComponent } from './features/device/devices/devices.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'spectate', component: SpectatorComponent, canActivate: [AuthGuard] },
  { path: 'devices/:id/transmission', component: DeviceTransmissionComponent, canActivate: [AuthGuard] },
  { path: 'devices', component: DevicesComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
