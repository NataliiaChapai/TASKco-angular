import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  url = environment.apiUrl + '/auth/google';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public auth: AuthService
  ) {
    this.form = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {}

  login() {
    const val = this.form.value;
    this.submitted = true;

    this.auth.login(val).subscribe(
      () => {
        this.router.navigateByUrl('/dashboard');
        this.submitted = false;
      },
      () => this.submitted = false
    );
  }
}
