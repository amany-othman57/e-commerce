import { Component, inject, OnDestroy } from '@angular/core';
import{ FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import { RxReactiveFormsModule, RxwebValidators } from '@rxweb/reactive-form-validators';
import { RegisterService } from '../../core/services/register.service';
import { Router } from '@angular/router';
import { RouterLink } from "@angular/router"
import { Subscription } from 'rxjs';
import test from 'node:test';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, RxReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{
  private readonly _RegisterService=inject(RegisterService)
  private readonly _Router=inject(Router)
  registered:Boolean=false;
  notregistered:boolean=false;
  errorMessage:string=''
  unSubSignUp:Subscription={} as Subscription
registerForm:FormGroup=new FormGroup({
  name:new FormControl(null,[Validators.required , Validators.minLength(3),Validators.maxLength(20)]),
  email:new FormControl(null,[Validators.required , Validators.email]),
  password:new FormControl(null,[Validators.required ,Validators.pattern('^[A-Z][a-z0-9]{6,}$')]),
  rePassword:new FormControl(null,RxwebValidators.compare({fieldName:'password' })),
  phone:new FormControl(null,[Validators.required ,Validators.pattern('^01[0125][0-9]{8}$')])
})

submitRegisteration():void{
  console.log('form submitted')
  this._RegisterService.signUp(this.registerForm.value).subscribe({
    next:(res)=> {
        console.log(res)
        if(res.message=='success'){
          this.registered=true;
          setTimeout(() => {
           this._Router.navigate(['/login'])
          }, 2000);   
        }
    },
    error:(err)=>{
      console.log(err)
      this.notregistered=true;
      this.errorMessage=err.error.message;
    }
  })

}
ngOnDestroy(): void {
    this.unSubSignUp.unsubscribe()
}
}
