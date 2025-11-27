import { Component, inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../../core/services/services/login.service';
import { NgxSpinnerService, NgxSpinnerComponent } from "ngx-spinner";
import { IToken } from '../../core/interfaces/interfaces/itoken';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, NgxSpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  constructor(private spinner: NgxSpinnerService) {}
  errorMessage: string = '';
  loged: boolean = false;
  unSubSignIn?: Subscription;
  
  private readonly _LoginService = inject(LoginService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _Router = inject(Router);
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[A-Z][a-z0-9]{6,}$'),
    ]),
  });
 
  submitLogin(): void {
    this.spinner.show();
 this.unSubSignIn= this._LoginService.signIn(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.spinner.hide();
        if (res.message == 'success') {
          if (isPlatformBrowser(this._PLATFORM_ID)) {
            console.log(res.token)
            localStorage.setItem('userToken', res.token);
              this._LoginService.getUserId();
             console.log(   this._LoginService.getData)
          }
          this.loged = false;
          
          this._Router.navigate(['/']);
        }
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        this.loged = true;
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      },
    });
  }
  ngOnDestroy(): void {
    if (this.unSubSignIn) {
      this.unSubSignIn.unsubscribe();
    }
  }
}
