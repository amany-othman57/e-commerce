import { Component, inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResetPasswordService } from '../../core/services/services/reset-password.service';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent implements OnDestroy {
  private readonly _ResetPasswordService = inject(ResetPasswordService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _Router = inject(Router);
  step: number = 0;
  statusMsg: string = '';
  userEmail: string = '';
  unSubForget?: Subscription;
  unSubResetCode?: Subscription;
  unSubResetPass?: Subscription;

  emailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });
  newPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[A-Z][a-z0-9]{6,}$'),
    ]),
  });
  submitEmail(): void {
    if (this.emailForm.valid) {
      this.unSubForget = this._ResetPasswordService
        .forgetPassword(this.emailForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.statusMsg == 'success') {
              this.step = 1;
              this.statusMsg = res.message;
              this.userEmail = this.emailForm.get('email')?.value;
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      this.emailForm.markAllAsTouched();
    }
  }
  codeSubmit(): void {
    if (this.resetCodeForm.valid) {
      this.unSubResetCode = this._ResetPasswordService
        .resetCode(this.resetCodeForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.status == 'Success') {
              this.step = 2;
              this.newPasswordForm.get('email')?.patchValue(this.userEmail);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      this.resetCodeForm.markAllAsTouched();
    }
  }
  submitNewPassword(): void {
    if (this.newPasswordForm.valid) {
      this.unSubResetPass = this._ResetPasswordService
        .resetPassword(this.newPasswordForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (isPlatformBrowser(this._PLATFORM_ID)) {
              localStorage.setItem('userToken', res.token);
              this._Router.navigate(['/home']);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      this.newPasswordForm.markAllAsTouched();
    }
  }
  ngOnDestroy(): void {
    if (this.unSubForget) {
      this.unSubForget.unsubscribe();
    }
    if (this.unSubResetCode) {
      this.unSubResetCode.unsubscribe();
    }
    if (this.unSubResetPass) {
      this.unSubResetPass.unsubscribe();
    }
  }
}
