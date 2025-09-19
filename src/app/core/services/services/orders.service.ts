import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../environments/environment';
import { CartService } from './cart.service';
import { IShipping } from '../../interfaces/interfaces/ishipping';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient:HttpClient , private _CartService:CartService) { }
  cashOrder(cartId:string|null,shippingDetails:object):Observable<any>{
    return this._HttpClient.post(`${Environment.baseUrl}api/v1/orders/${cartId}`,{"shippingAddress":shippingDetails},{headers:this._CartService.header})
  }
  checkOutOrder(cartId:string|null,shippingDetails:object):Observable<any>{
    return this._HttpClient.post(`${Environment.baseUrl}api/v1/orders/checkout-session/${cartId}?url=${Environment.hostServer}`,{"shippingAddress":shippingDetails},{headers:this._CartService.header})
  }
  getUserOrders(userId:string|null):Observable<IShipping[]>{
    return this._HttpClient.get<IShipping[]>(`${Environment.baseUrl}api/v1/orders/user/${userId}`)
  }

}
