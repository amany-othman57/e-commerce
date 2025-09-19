import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  constructor(private _HttpClient: HttpClient) {}
  forgetPassword(data: object): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}api/v1/auth/forgotPasswords`,
      data
    );
  }
  resetCode(data: object): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}api/v1/auth/verifyResetCode`,
      data
    );
  }
  resetPassword(data: object): Observable<any> {
    return this._HttpClient.put(
      `${Environment.baseUrl}api/v1/auth/resetPassword`,
      data
    );
  }
}
