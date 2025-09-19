import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AccountService } from '../../core/services/services/account.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-password',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent {
  private readonly _AccountService=inject(AccountService)
updatePasswordForm:FormGroup=new FormGroup({
   currentPassword:new FormControl(null,[Validators.required]),
   password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[A-Z][a-z0-9]{6,}$'),
    ]),
    rePassword: new FormControl(
      null,
      RxwebValidators.compare({ fieldName: 'password' })
    ),
})
    submit():void{
      
       if(this.updatePasswordForm.valid){
          console.log(this.updatePasswordForm.value)
          this._AccountService.updatePassword(this.updatePasswordForm.value).subscribe({
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
         if(err.error.statusMsg=='fail'){
            Swal.fire({
                       title: 'Error',
                       text: `Wrong Password!`,
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
}
