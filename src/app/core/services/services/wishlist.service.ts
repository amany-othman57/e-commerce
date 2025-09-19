import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _CartService = inject(CartService);
  constructor(private _HttpClient: HttpClient) {}

  addToWishlist(id: string): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}api/v1/wishlist`,
      { productId: id },
      { headers: this._CartService.header }
    );
  }
  getWishlist(): Observable<any> {
    return this._HttpClient.get(`${Environment.baseUrl}api/v1/wishlist`, {
      headers: this._CartService.header,
    });
  }
  removeItemFromWishlist(id: string): Observable<any> {
    return this._HttpClient.delete(
      `${Environment.baseUrl}api/v1/wishlist/${id}`,
      { headers: this._CartService.header }
    );
  }
}
