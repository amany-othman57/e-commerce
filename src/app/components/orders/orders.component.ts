import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/services/orders.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  private readonly _OrdersService = inject(OrdersService);
  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _Router=inject(Router)
  checkedMethod:string=''
  cartId:string|null=''
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
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
   if(this.shippingForm.valid && this.checkedMethod=='cash'){
    this._OrdersService.cashOrder(this.cartId,this.shippingForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status=='success')
          this._Router.navigate(['/allorders'])

      },
      error:(err)=>{
        console.log(err)
      }
    })
    
   }
     else if(this.shippingForm.valid && this.checkedMethod=='visa'){
      this._OrdersService.checkOutOrder(this.cartId,this.shippingForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          window.open(res.session.url ,'_self')
        },
        error:(err)=>{
          console.log(err)
        }
      })
     }


    
  }
}
