import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './components/auth.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
];

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthService, AuthGuard],
})
export class AuthModule { }
