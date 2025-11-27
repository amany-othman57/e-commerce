import { AccountService } from './../../core/services/services/account.service';
import { Component, inject, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-info',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.scss'
})
export class AccountInfoComponent implements OnDestroy{
  private readonly _AccountService=inject(AccountService)
  unSubUpdateUserData?:Subscription
  
  updateForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    phone: new FormControl(null, [Validators.required,Validators.pattern('^01[0125][0-9]{8}$')
    ])
  })

  submit():void{
   
    if(this.updateForm.valid){
       console.log(this.updateForm.value)
   this.unSubUpdateUserData= this._AccountService.updateUserData(this.updateForm.value).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.message=='success'){
         Swal.fire({
                    title: 'Success',
                    text: `your Personal Info Updated!`,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true,
                    position: 'top-end',
                  });
      }
      
    },
    error:(err)=>{
      console.log(err.error)
      if(err.error.message=='fail'){
         Swal.fire({
                    title: err.error.errors.msg,
                    text: `update this Email`,
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true,
                    position: 'top-end',
                  });
      }
    }
   })
    }
  
  }
  ngOnDestroy(): void {
      if(this.unSubUpdateUserData){
        this.unSubUpdateUserData.unsubscribe()
      }
  }

}
