import { IuserData } from '../core/interfaces/iuser-data';
import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../core/environments/environment';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
getData!:string|null;
userData:IuserData= {} as IuserData
private readonly _PLATFORM_ID=PLATFORM_ID
  constructor(private _HttpClient:HttpClient) { }

  signIn(data:object):Observable<any>{
  return this._HttpClient.post(`${Environment.baseUrl}api/v1/auth/signin`,data);
  }

  saveUserData():void{
    if(isPlatformBrowser(this._PLATFORM_ID)){
this.getData=localStorage.getItem('userToken');
if(this.getData){
this.userData=jwtDecode(this.getData);
console.log(this.userData)
}
    }

   }
}


