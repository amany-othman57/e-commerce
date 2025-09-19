import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private _HttpClient: HttpClient) {}
  getSpecificBrand(id: string): Observable<any> {
    return this._HttpClient.get(`${Environment.baseUrl}api/v1/brands/${id}`);
  }
  getAllBrands(): Observable<any> {
    return this._HttpClient.get(`${Environment.baseUrl}api/v1/brands`);
  }
}
