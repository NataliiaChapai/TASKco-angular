import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { InputComponent } from './components/input/input.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SuccessMessageComponent } from './components/success-message/success-message.component';
import { SliderButtonComponent } from './components/slider-button/slider-button.component';
import { GreyButtonComponent } from './components/grey-button/grey-button.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { PasswordToggleDirective } from './directives/password-toggle.directive';


@NgModule({
  declarations: [
    InputComponent,
    ErrorMessageComponent,
    GreyButtonComponent,
    LoaderComponent,
    SuccessMessageComponent,
    SliderButtonComponent,
    FormInputComponent,
    ToolbarComponent,
    ConfirmDialogComponent,
    PasswordToggleDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ], 
  exports: [ 
    LoaderComponent,
    ErrorMessageComponent,
    SuccessMessageComponent,
    SliderButtonComponent,
    GreyButtonComponent,
    InputComponent,
    FormInputComponent,
    ToolbarComponent,
    ConfirmDialogComponent,
    PasswordToggleDirective
  ]
})
export class SharedModule { }
