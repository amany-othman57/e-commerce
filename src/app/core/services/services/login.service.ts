import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { IuserData } from '../../interfaces/interfaces/iuser-data';
import { CartService } from './cart.service';
import { IToken } from '../../interfaces/interfaces/itoken';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  id:string=''
  getData:any;
  userData:any;
  private readonly _PLATFORM_ID =inject(PLATFORM_ID);
  header:any={token:localStorage.getItem('userToken')}
  constructor(private _HttpClient: HttpClient ,private _CartService:CartService) {
  }
  verifyToken():Observable<any>{
    return this._HttpClient.get(`${Environment.baseUrl}api/v1/auth/verifyToken`,{headers:this.header})
  }

  signIn(data: object): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}api/v1/auth/signin`,
      data
    );
  }

  // saveUserData(): void {
  //   if (isPlatformBrowser(this._PLATFORM_ID)) {
  //     this.getData = localStorage.getItem('userToken');
  //     console.log(this.getData)
  //     if (this.getData) {
  //       this.userData = jwtDecode(this.getData);
  //       console.log(this.userData);
  //     }
  //   }
   
  // }
  getUserId():void{
     this.verifyToken().subscribe({
          next:(res)=>{
            console.log(res)
            if(res.message=='verified'){
              this.id=res.decoded.id;
              localStorage.setItem('userId',this.id)
              console.log(this.id)
            }
          },
          error:(err)=>{
            console.log(err)
          }
        })
             
  }
}
