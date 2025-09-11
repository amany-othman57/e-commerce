import { Environment } from './../core/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }
  getAllProducts():Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}api/v1/products`)
  }
  getSpecificProduct(id:string):Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}api/v1/products/${id}`)
  }
}
