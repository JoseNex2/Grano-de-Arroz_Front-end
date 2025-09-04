import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token');

  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp * 1000;
      const now = Date.now();

      if (now >= exp) {
        // Token vencido → logout y cancelar
        localStorage.removeItem('access_token');
        router.navigate(['/login']);
        return next(req); // 👈 no agregamos headers
      }

      // Token válido → agregar Authorization
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next(authReq);

    } catch (e) {
      localStorage.removeItem('access_token');
      router.navigate(['/login']);
      return next(req);
    }
  }

  // No hay token → redirigir y no mandar nada
  router.navigate(['/login']);
  return next(req);
};
