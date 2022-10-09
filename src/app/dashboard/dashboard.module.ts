import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';
import { BoardComponent } from './components/board/board.component';
import { LoaderModule } from '../shared/components/loader/loader.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { ModalComponent } from './components/modal/modal.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    BoardComponent,
    ModalComponent,
    EditModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    LoaderModule,
    PipesModule,
    FormsModule,
    SharedModule
  ],
  providers: [AuthGuard, AuthService]
})
export class DashboardModule { }
