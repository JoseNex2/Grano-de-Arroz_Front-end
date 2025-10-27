import {Injectable, signal} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../enviroments/develop.enviroment';
import {Router} from '@angular/router';
import {MeUserAuth} from "../../interfaces/auth/me-user-auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user = signal<MeUserAuth | null>(null);
  user = this._user.asReadonly();

  private apiUrl = environment.apiUrl;
  private readonly REMEMBERED_EMAIL_KEY = 'remembered_email';
  
  constructor(private http: HttpClient, private router: Router) {}

  getRememberedEmail(): string | null {
    return localStorage.getItem(this.REMEMBERED_EMAIL_KEY);
  }

  saveRememberedEmail(email: string): void {
    localStorage.setItem(this.REMEMBERED_EMAIL_KEY, email);
  }

  clearRememberedEmail(): void {
    localStorage.removeItem(this.REMEMBERED_EMAIL_KEY);
  }

  login(credentials: { Email: string, Password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Access/login`, credentials);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
