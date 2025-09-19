import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  header: any = { token: localStorage.getItem('userToken') };
  constructor(private _HttpClient: HttpClient) {}
  addToCart(id:string): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}api/v1/cart`,
      { "productId": id },
      { headers: this.header }
    );
  }
  updateQuantity(id: string, count: number): Observable<any> {
    return this._HttpClient.put(
      `${Environment.baseUrl}api/v1/cart/${id}`,
      { count: count },
      { headers: this.header }
    );
  }
  getCart(): Observable<any> {
    return this._HttpClient.get(`${Environment.baseUrl}api/v1/cart`, {
      headers: this.header,
    });
  }
  removeSpecificItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${Environment.baseUrl}api/v1/cart/${id}`, {
      headers: this.header,
    });
  }
  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${Environment.baseUrl}api/v1/cart`, {
      headers: this.header,
    });
  }
}
