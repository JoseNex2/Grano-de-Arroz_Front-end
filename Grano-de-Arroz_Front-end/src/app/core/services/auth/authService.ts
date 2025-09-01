import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../enviroments/develop.enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: { Email: string, Password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Access/login`, credentials);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
