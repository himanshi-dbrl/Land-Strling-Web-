import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProtectGuard } from './guards/protect.guard';
import { LogoutGuard } from './guards/logout.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginPasswordComponent } from './login-password/login-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '*', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [ProtectGuard],
    component: LoginComponent,
  },
  {
    path: 'password',
    canActivate: [ProtectGuard],
    component: LoginPasswordComponent,
  },
  {
    path: 'forgot-password',
    // canActivate: [ProtectGuard],
    component: ForgetPasswordComponent,
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
