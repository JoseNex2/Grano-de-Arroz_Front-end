import {Injectable, signal} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../enviroments/develop.enviroment';
import {Router} from '@angular/router';
import {MeUserAuth} from "../../interfaces/auth/me-user-auth";
import {EncryptionService} from '../encryption/encryption-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user = signal<MeUserAuth | null>(null);
  user = this._user.asReadonly();

  private apiUrl = environment.apiUrl;
  private readonly REMEMBERED_EMAIL_KEY = 'remembered_email';
  private readonly REMEMBERED_PASSWORD_KEY = 'remembered_password';
  
  constructor(
    private http: HttpClient, 
    private router: Router,
    private encryptionService: EncryptionService
  ) {}

  getRememberedCredentials(): { email: string; password: string } | null {
    try {
      const encryptedEmail = localStorage.getItem(this.REMEMBERED_EMAIL_KEY);
      const encryptedPassword = localStorage.getItem(this.REMEMBERED_PASSWORD_KEY);

      if (encryptedEmail && encryptedPassword) {
        const email = this.encryptionService.decrypt(encryptedEmail);
        const password = this.encryptionService.decrypt(encryptedPassword);

        if (email && !email.includes('Error') && password && !password.includes('Error')) {
          return { email, password };
        }
      }
      return null;
    } catch (error) {
      console.error('Error al obtener credenciales recordadas:', error);
      return null;
    }
  }

  saveRememberedCredentials(email: string, password: string): void {
    try {
      const encryptedEmail = this.encryptionService.encrypt(email);
      const encryptedPassword = this.encryptionService.encrypt(password);
      
      localStorage.setItem(this.REMEMBERED_EMAIL_KEY, encryptedEmail);
      localStorage.setItem(this.REMEMBERED_PASSWORD_KEY, encryptedPassword);
    } catch (error) {
      console.error('Error al guardar credenciales:', error);
    }
  }

  clearRememberedCredentials(): void {
    localStorage.removeItem(this.REMEMBERED_EMAIL_KEY);
    localStorage.removeItem(this.REMEMBERED_PASSWORD_KEY);
  }

  getRememberedEmail(): string | null {
    const credentials = this.getRememberedCredentials();
    return credentials ? credentials.email : null;
  }

  saveRememberedEmail(email: string): void {
    console.warn('Use saveRememberedCredentials instead');
  }

  clearRememberedEmail(): void {
    this.clearRememberedCredentials();
  }

  login(credentials: { Email: string, Password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Access/login`, credentials);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('meUser');
    localStorage.removeItem('rol');
    localStorage.removeItem('email');
    localStorage.removeItem('token_exp');
    // NO limpiamos las credenciales recordadas al hacer logout
    // para que persistan si el usuario marcó "Recordarme"
    this.router.navigate(['/login']);
  }
}
