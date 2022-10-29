import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessagesService } from 'src/app/shared/services/messages.service';
import { CurrentUser } from '../../models/current-user';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  user: CurrentUser;
  submitted = false;
  error = false;

  constructor(
    private fb: FormBuilder,
    private store: StoreService,
    public messages: MessagesService,
  ) { 
    this.store.currentUser$.subscribe(res => this.user = res);
    this.form = fb.group({
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void { }

  changePassword() {
    const value = this.form.value;
    if (value.password != value.confirmPassword) {
      return this.error = true;
    }
    this.submitted = true;
    const newPassword = {
      password: value.password
    }
    this.store.updatePassword(newPassword).subscribe(
      () => {
        this.submitted = false;
        this.form.reset();
      },
      () => this.submitted = false
    );
  }

}
