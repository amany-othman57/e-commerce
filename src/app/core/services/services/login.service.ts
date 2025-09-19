import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { IuserData } from '../../interfaces/interfaces/iuser-data';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  getData:any;
  userData:any;
  private readonly _PLATFORM_ID =inject(PLATFORM_ID);
  constructor(private _HttpClient: HttpClient) {
  }

  signIn(data: object): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}api/v1/auth/signin`,
      data
    );
  }

  saveUserData(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.getData = localStorage.getItem('userToken');
      console.log(this.getData)
      if (this.getData) {
        this.userData = jwtDecode(this.getData);
        console.log(this.userData);
      }
    }
   
  }
}
