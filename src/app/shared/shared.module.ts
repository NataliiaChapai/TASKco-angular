import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { ButtonComponent } from './components/button/button.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { InputComponent } from './components/input/input.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SuccessMessageComponent } from './components/success-message/success-message.component';



@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    BackdropComponent,
    ErrorMessageComponent,
    LoaderComponent,
    SuccessMessageComponent,
  ],
  imports: [
    CommonModule
  ], 
  exports: [ 
    LoaderComponent,
    ErrorMessageComponent,
    SuccessMessageComponent
  ]
})
export class SharedModule { }
