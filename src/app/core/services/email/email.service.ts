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
   * @param token Token del enlace de recuperació n
   * @returns Observable con la validación del token
   */
  validateResetToken(token: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/access/validate-reset-token/${token}`);
  }

  /**
   * Establece la nueva contraseña usando el token en el header Authorization
   * @param token Token completo de la URL
   * @param newPassword Nueva contraseña
   * @returns Observable con la respuesta del backend
   */
  resetPassword(token: string, newPassword: string): Observable<ApiResponse<any>> {
    const payload = {
      NewPassword: newPassword
    };
    
    const headers = {
      'Authorization': token
    };
    
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/access/passwordrecovery`, payload, { headers });
  }

  /**
   * Actualiza la contraseña del usuario
   * @param id ID del usuario
   * @param newPassword Nueva contraseña
   * @param currentPassword Contraseña actual
   * @returns Observable con la respuesta del backend
   */
  updatePassword(id: string, newPassword: string, currentPassword: string): Observable<ApiResponse<any>> {
    const payload = {
      Id: id,
      NewPassword: newPassword,
      CurrentPassword: currentPassword
    };
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/access/passwordupdate`, payload);
  }
}
