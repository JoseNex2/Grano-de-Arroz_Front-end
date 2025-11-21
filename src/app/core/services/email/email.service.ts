import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/develop.enviroment';
import { ApiResponse } from '../../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Solicita recuperación de contraseña
   * @param email Email del usuario que olvidó su contraseña
   * @param baseUrl URL base de la aplicación frontend (ej: http://localhost:4200)
   * @returns Observable con la respuesta del backend que incluye el token
   */
  requestPasswordReset(email: string, baseUrl: string): Observable<ApiResponse<any>> {
    const payload = {
      Url: baseUrl,
      Email: email
    };
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/access/accountrecovery`, payload);
  }

  /**
   * Valida el token de recuperación de contraseña
   * @param token Token del enlace de recuperación
   * @returns Observable con la validación del token
   */
  validateResetToken(token: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/access/validate-reset-token/${token}`);
  }

  /**
   * Establece la nueva contraseña
   * @param token Token de recuperación
   * @param newPassword Nueva contraseña
   * @returns Observable con la respuesta del backend
   */
  resetPassword(token: string, NewPassword: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/access/reset-password`, { 
      token, 
      NewPassword 
    });
  }
}
