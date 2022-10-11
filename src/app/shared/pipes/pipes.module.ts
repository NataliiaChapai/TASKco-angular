import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter/filter.pipe';
import { SortPipe } from './sort/sort.pipe';



@NgModule({
  declarations: [FilterPipe, SortPipe],
  imports: [
    CommonModule
  ],
  exports: [
    FilterPipe,
    SortPipe
  
  ]
})
export class PipesModule { }
