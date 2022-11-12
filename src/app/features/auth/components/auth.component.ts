import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MessagesService } from 'src/app/shared/services/messages.service';
import { environment } from 'src/environments/environment';
import { DashboardStore } from '../../dashboard/services/dashboard.store';
import { UserStore } from '../../user/services/user.store';
import { User } from '../models/user';
import { AuthStore } from '../services/auth.store';
import {createEmailStrengthValidator} from '../../../shared/validators/email-strength.validator';
import {createPasswordStrengthValidator} from '../../../shared/validators/password-strength.validator';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit, OnDestroy {
  form: FormGroup;
  submitted = false;
  url = environment.apiUrl + '/auth/google';
  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public auth: AuthStore,
    private user: UserStore,
    private dashboard: DashboardStore,
    private route: ActivatedRoute,
    public messages: MessagesService
  ) {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email, Validators.minLength(10), createEmailStrengthValidator()]],
      password: [null, [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]],
    });
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      return
    }
    this.subscription = this.route.queryParams.subscribe(params => {
      const user: User = {email: '', avatarURL: null};
      if (params['token']) {
        localStorage.setItem('token', JSON.stringify(params['token']))
      }
      if (params['avatarURL']) {
        user.avatarURL = params['avatarURL'];
        this.dashboard.loadAllBoards();
        this.user.loadCurrentUser();
        this.user.saveAvatarUrl(params['avatarURL']);
      }
      if (params['email']) {
        user.email = params['email'];
        localStorage.setItem('user', JSON.stringify(user))
        this.router.navigate(['/dashboard']); 
      }
      this.auth.subject.next(user);
      
    })
  }

  register(): void {
    const value = this.form.value;
    this.submitted = true;
    this.auth.register(value).subscribe(
      () => {
        this.submitted = false;
      },
      () => (this.submitted = false)
    );
  }

  login() {
    const value = this.form.value;
    this.submitted = true;

    this.auth.login(value).subscribe({
      next: () => {
        this.dashboard.loadAllBoards();
        this.user.loadCurrentUser();
        this.router.navigateByUrl('/dashboard');
        this.submitted = false;
      },
      error: () => this.submitted = false
    });
  }

  forgotPassword() {
    const email = {
      email: this.form.value.email
    }
    this.auth.sendPassword(email).subscribe()

  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
