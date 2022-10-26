import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { environment } from 'src/environments/environment';
import { CurrentUser } from '../models/currentUser';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  url = environment.apiUrl + '/auth/google';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public auth: AuthService,
    private route: ActivatedRoute,
    public messages: MessagesService
  ) {
    this.form = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      return
    }
    this.route.queryParams.subscribe(params => {
      const user: CurrentUser = {email: null, avatarUrl: null};
      if (params['token']) {
        localStorage.setItem('token', JSON.stringify(params['token']))
      }
      if (params['avatarURL']) {
        user.avatarUrl = params['avatarURL'];
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

    this.auth.login(value).subscribe(
      () => {
        this.router.navigateByUrl('/dashboard');
        this.submitted = false;
      },
      () => this.submitted = false
    );
  }
}
