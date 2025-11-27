import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/services/orders.service';
import { IShipping } from '../../core/interfaces/interfaces/ishipping';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-allorders',
  imports: [DatePipe, RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit,OnDestroy {
  private readonly _OrdersService=inject(OrdersService)
  unSubGetUserOrders?:Subscription
  userId=localStorage.getItem('userId')
  shippingList:IShipping[]=[]
ngOnInit(): void {
       console.log('in local',this.userId)
        this._OrdersService.getUserOrders(this.userId).subscribe({
          next:(res)=>{
            console.log(res)
            this.shippingList=res
            console.log('shoppinglist',this.shippingList)
          },
          error:(err)=>{
            console.log('error',err)
          }
        })
      }
ngOnDestroy(): void {
    if(this.unSubGetUserOrders){
      this.unSubGetUserOrders.unsubscribe()
    }
}
    
}




