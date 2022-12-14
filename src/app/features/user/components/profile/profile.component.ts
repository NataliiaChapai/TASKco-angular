import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
;
import { AuthStore } from 'src/app/features/auth/services/auth.store';
import { LoadingService } from 'src/app/shared/services/loading.service'
import { MessagesService } from 'src/app/shared/services/messages.service';
import { createPasswordStrengthValidator } from 'src/app/shared/validators/password-strength.validator';
import { CurrentUser } from '../../models/current-user';
import { UserStore } from '../../services/user.store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  user: CurrentUser;
  submitted = false;
  error = false;
  avatarFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private store: UserStore,
    public messages: MessagesService,
    private loader: LoadingService,
    private auth: AuthStore
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.store.currentUser$.subscribe(res => (this.user = res));
    this.form = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]],
    });
  }

  changePassword() {
    const value = this.form.value;
    if (value.password != value.confirmPassword) {
      return (this.error = true);
    }
    this.submitted = true;
    const newPassword = {
      password: value.password,
    };
    this.store.updatePassword(newPassword).subscribe({
      next: () => {
        this.submitted = false;
        this.form.reset();
      },
      error: () => (this.submitted = false)
    });
  }

  addAvatar(event: any) {
    this.loader.loadingOn();
    this.avatarFile = event.target.files[0];
    const authData = this.auth.subject.getValue();
    const updateAuthData = {
      ...authData,
      avatarURL: this.user.avatarURL,
    };
    if (this.avatarFile) {
      return this.store.updateAvatar(this.avatarFile).subscribe(() => {
        this.auth.subject.next(updateAuthData);
        this.loader.loadingOff();
      });
    }
  }
}
