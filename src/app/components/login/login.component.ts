import { Component, inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  errorMessage:string=''
  loged:boolean=false;
  unSubSignIn:Subscription={} as Subscription
  private readonly _LoginService=inject(LoginService);
  private readonly _PLATFORM_ID=inject(PLATFORM_ID)
  private readonly _Router=inject(Router);
loginForm:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required ,Validators.pattern('^[A-Z][a-z0-9]{6,}$')]),
})

submitLogin():void{
this._LoginService.signIn(this.loginForm.value).subscribe({
  next:(res)=>{
    console.log(res)
    if(res.message=='success'){
      if(isPlatformBrowser(this._PLATFORM_ID)){
    localStorage.setItem('userToken',res.token);
      }
      this.loged=false;
    this._LoginService.saveUserData();
    this._Router.navigate(['/'])
    }
  },
  error:(err)=>{
    console.log(err)
    this.loged=true
    this.errorMessage=err.error.message
    console.log(this.errorMessage)
  }
})
}
ngOnDestroy(): void {
    this.unSubSignIn.unsubscribe();
}
}
