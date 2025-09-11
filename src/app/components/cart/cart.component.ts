import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ICart } from '../../interfaces/icart';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit,OnDestroy{
  unSubGet:Subscription={} as Subscription;
    unSubRemove:Subscription={} as Subscription;
  unSubClear:Subscription={} as Subscription;
  unSubUpdate:Subscription={} as Subscription;

  private readonly _CartService=inject(CartService)
  cartData:ICart={} as ICart
ngOnInit(): void {
this.unSubGet=    this._CartService.getCart().subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status=='success'){
          this.cartData=res.data
          console.log(this.cartData)
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
}
remove(id:string):void{
this.unSubRemove=  this._CartService.removeSpecificItem(id).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.status=='success'){
       this.cartData= res.data
        Swal.fire({
                title: 'Removed from Cart!',
                text: `item has been Removed.`,
                icon: 'error',
                showConfirmButton: false,
                timer: 2000,
                toast: true,
                position: 'top-end'
              });
      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
update(id:string,count:number):void{
this.unSubUpdate=  this._CartService.updateQuantity(id,count).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.status=='success'){
        this.cartData=res.data
      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
clear():void{
this.unSubClear=  this._CartService.clearCart().subscribe({
    next:(res)=>{
      console.log(res)
      if(res.message=='success'){
        this.cartData={} as ICart;
         Swal.fire({
                title: 'Removed from Cart!',
                text: `ALL items Removed.`,
                icon: 'error',
                showConfirmButton: false,
                timer: 2000,
                toast: true,
                position: 'top-end'
              });
      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
ngOnDestroy(): void {
    this.unSubClear.unsubscribe();
    this.unSubGet.unsubscribe();
    this.unSubRemove.unsubscribe();
    this.unSubUpdate.unsubscribe();
}
}
