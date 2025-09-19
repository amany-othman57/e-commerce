import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { IShipping } from '../../core/interfaces/interfaces/ishipping';
import { DatePipe } from '@angular/common';
import { LoginService } from '../../core/services/services/login.service';
import { RouterLink } from '@angular/router';
import { IToken } from '../../core/interfaces/interfaces/itoken';
@Component({
  selector: 'app-allorders',
  imports: [DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  private readonly _OrdersService=inject(OrdersService)
  private readonly _LoginService=inject(LoginService)

  shippingList:IShipping[]=[]
ngOnInit(): void {
        const token:IToken = this._LoginService.userData
        console.log(token)
        this._OrdersService.getUserOrders(token.id).subscribe({
          next:(res)=>{
            console.log(res)
            this.shippingList=res
            console.log(this.shippingList)
          },
          error:(err)=>{
            console.log(err)
          }
        })
      }

    
}




