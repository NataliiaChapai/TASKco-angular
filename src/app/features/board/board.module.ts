import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { TasksComponent } from './components/tasks/tasks.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ArchiveTaskComponent } from './components/archive-task/archive-task.component';
import { TaskComponent } from './components/task/task.component';
import { TaskColumnComponent } from './components/task-column/task-column.component';
import { AuthGuard } from '../auth/services/auth.guard';

const routes: Routes = [
  {
    path: ':id',
    component: TasksComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    TasksComponent,
    ArchiveTaskComponent,
    TaskComponent,
    TaskColumnComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    DashboardModule,
    PipesModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class BoardModule { }
