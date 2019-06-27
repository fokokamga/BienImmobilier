import { AuthGuardService } from './services/auth-guard.service';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminSigninComponent} from './admin/admin-signin/admin-signin.component';

const routes: Routes = [
  // {path: 'home', component : HomeComponent},
  // {path: 'property/:id', component : SinglePropertComponent},
  {path: 'admin/login', component : AdminSigninComponent},
  {path: 'admin/dashboard', canActivate: [AuthGuardService], component : AdminDashboardComponent},
  {path: '', redirectTo: 'admin/login', pathMatch : 'full'},
  {path: '**', redirectTo: 'admin/login'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
