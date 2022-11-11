import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BoardComponent } from './components/board/board.component';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ModalComponent } from './components/modal/modal.component';
import { SharedModule } from '../../shared/shared.module';
import { SortParamsDirective } from './directives/sort-params.directive';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '../auth/services/auth.guard';

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
    SortParamsDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    RouterModule,
  ],
  providers: [AuthGuard]
})
export class DashboardModule { }
