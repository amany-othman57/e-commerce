import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _HttpClient: HttpClient) {}
  getAllProducts(): Observable<any> {
    return this._HttpClient.get(`${Environment.baseUrl}api/v1/products`);
  }
  getSpecificProduct(id: string|null): Observable<any> {
    return this._HttpClient.get(`${Environment.baseUrl}api/v1/products/${id}`);
  }
  getProductsAll(page: number, limit: number): Observable<any> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    return this._HttpClient.get(`${Environment.baseUrl}api/v1/products`, {
      params,
    });
  }
  getProductOfSpecificCategory(
    categoryId: string,
    page: number,
    limit: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('category', categoryId)
      .set('page', page)
      .set('limit', limit);
    return this._HttpClient.get(`${Environment.baseUrl}api/v1/products`, {
      params,
    });
  }
}
