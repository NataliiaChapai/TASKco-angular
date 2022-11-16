import { Component } from '@angular/core';

@Component({
  selector: 'app-user-form',
  template: `
  <div class="password-wrapper">
    <input 
        appPasswordToggle 
        type="password">                
    </div>
  `
})
export class UserFormStubComponent {}