import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../enviroments/develop.enviroment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { Email: string, Password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Access/login`, credentials);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
