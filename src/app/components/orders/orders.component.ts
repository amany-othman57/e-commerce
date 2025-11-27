import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/services/orders.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerComponent, NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  imports: [ReactiveFormsModule, FormsModule, NgxSpinnerComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit ,OnDestroy{
   constructor(private spinner: NgxSpinnerService) {}
  private readonly _OrdersService = inject(OrdersService);
  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _Router=inject(Router)
  checkedMethod:string=''
  cartId:string|null=''
  unSubActivated?:Subscription
  unSubCash?:Subscription
  unSubCheckOut?:Subscription
  ngOnInit(): void {
   this.unSubActivated= this._ActivatedRoute.paramMap.subscribe({
        next:(p)=>{
          console.log(p.get('id'))
          this.cartId=p.get('id')
          
          
        },
        error:(err)=>{
          console.log(err)
        }
      })
  }
method(e:Event):void{
  let x=e.target as HTMLInputElement
  this.checkedMethod=x.value
  console.log(this.checkedMethod)
}
  shippingForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
  });
  submitForm(): void {
    this.spinner.show()
   if(this.shippingForm.valid && this.checkedMethod=='cash'){
  this.unSubCash=this._OrdersService.cashOrder(this.cartId,this.shippingForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        this.spinner.hide()
        if(res.status=='success')
          this._Router.navigate(['/allorders'])


      },
      error:(err)=>{
        console.log(err)
        this.spinner.hide()
         Swal.fire({
                    title: 'Fail',
                    text: `SomeThing went wrong,try again!`,
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true,
                    position: 'top-end',
                  });
      }
    })
    
   }
     else if(this.shippingForm.valid && this.checkedMethod=='visa'){
      this.spinner.show()
  this.unSubCheckOut= this._OrdersService.checkOutOrder(this.cartId,this.shippingForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          this.spinner.hide()
          window.open(res.session.url ,'_self')
        },
        error:(err)=>{
          console.log(err)
          this.spinner.hide()
           Swal.fire({
                      title: 'Fail',
                      text: `Something went wrong ,try again!`,
                      icon: 'error',
                      showConfirmButton: false,
                      timer: 2000,
                      toast: true,
                      position: 'top-end',
                    });
        }
      })
     }


    
  }
  ngOnDestroy(): void {
      if(this.unSubActivated){
        this.unSubActivated.unsubscribe()
      }
      if(this.unSubCash){
        this.unSubCash.unsubscribe()
      }
      if(this.unSubCheckOut){
        this.unSubCheckOut.unsubscribe()
      }
  }
}
