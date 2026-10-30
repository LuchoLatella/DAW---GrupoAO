import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(private http: HttpClient) {}
  
  login(documento: string, clave: string) {
  return this.http.post('/api/auth/login', {
    documento: documento,
    clave: clave
  });
}

}