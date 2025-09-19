import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private _HttpClient: HttpClient) {}

  signUp(data: object): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}api/v1/auth/signup`,
      data
    );
  }
}
