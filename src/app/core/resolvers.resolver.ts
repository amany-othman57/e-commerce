import { ResolveFn } from '@angular/router';
import { IShipping } from './interfaces/interfaces/ishipping';
import { inject } from '@angular/core';
import { OrdersService } from './services/services/orders.service';
import { LoginService } from './services/services/login.service';
import { or } from '@rxweb/reactive-form-validators';

export const GetOrderByIdResolver: ResolveFn<IShipping|undefined> = (route, state) => {
  let shipping!:IShipping|undefined;
  let orderId:number
  const _OrdersService=inject(OrdersService)
  const _LoginService=inject(LoginService)
  orderId = Number(route.paramMap.get('id'));
  _OrdersService.getUserOrders(_LoginService.userData.id).subscribe({
    next:(res)=>{
      console.log(res)
      let order=res.find(o=>o.id==orderId)
      console.log(order)
      shipping=order
      return shipping
    },
    error:(err)=>{
      console.log(err)
    }
  })

  
  return shipping;
};
