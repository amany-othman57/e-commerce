import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/services/orders.service';
import { IShipping } from '../../core/interfaces/interfaces/ishipping';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-details',
  imports: [DatePipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit,OnDestroy {
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _OrdersService=inject(OrdersService)
  userId=localStorage.getItem('userId')
  orderId:number|null=null
  orderList:IShipping |undefined={} as IShipping
  unSubActivated?:Subscription
 ngOnInit(): void {
     this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        console.log(p.get('id'))
        this.orderId=Number(p.get('id'))
    this.unSubActivated= this._OrdersService.getUserOrders(this.userId).subscribe({
          next:(res)=>{
            console.log(res)
            this.orderList=res.find((item:IShipping)=>{
              return item.id==this.orderId
            })
            console.log(this.orderList)
          },
          error:(err)=>{
            console.log(err)
          }
        })
      },
      error:(err)=>{
        console.log(err)
      }
     })
     
    
 }
 ngOnDestroy(): void {
     if(this.unSubActivated){
      this.unSubActivated.unsubscribe()
     }
 }
    
}


