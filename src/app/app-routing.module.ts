import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/components/auth.component';
import { DashboardComponent } from './features/dashboard/components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'dashboard',
    // component: DashboardComponent
    loadChildren: () => import('./features/dashboard/dashboard.module').then(_ => _.DashboardModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
