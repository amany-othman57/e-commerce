import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../environments/environment';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  constructor(private _HttpClient:HttpClient, private _CartService:CartService) { }
  updateUserData(data : object): Observable<any>{
    return this._HttpClient.put(`${Environment.baseUrl}api/v1/users/updateMe/`,data,{headers:this._CartService.header})
  }
  updatePassword(data : object): Observable<any>{
    return this._HttpClient.put(`${Environment.baseUrl}api/v1/users/changeMyPassword`,data,{headers:this._CartService.header})
  }
}
