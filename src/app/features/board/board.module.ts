import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TasksComponent } from './components/tasks/tasks.component';
// import { ToolbarComponent } from '../shared/components/toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { AuthService } from '../auth/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BoardStore } from './services/board.store';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { SliderButtonComponent } from 'src/app/shared/components/slider-button/slider-button.component';



@NgModule({
  declarations: [
    TasksComponent,
    ToolbarComponent,
  ],
  imports: [
    RouterModule,
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
