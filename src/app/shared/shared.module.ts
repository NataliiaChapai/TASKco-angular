import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { ButtonComponent } from './components/button/button.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { InputComponent } from './components/input/input.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    BackdropComponent,
    ErrorMessageComponent,
    ToolbarComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    ToolbarComponent, 
    LoaderComponent
  ]
})
export class SharedModule { }
