import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

declare const bootstrap: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, { username, password });
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  estaAutenticado(): boolean {
  const token = this.obtenerToken();
  if (!token) return false;

  try {
    const decoded: any = jwtDecode(token);
    const exp = decoded.exp * 1000;
    const ahora = Date.now();

    console.log('Token expira en:', new Date(exp).toLocaleString());
    console.log('Ahora es:', new Date(ahora).toLocaleString());

    return exp > ahora;
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return false;
  }
}

  logout() {
    localStorage.removeItem('token');
    const toastEl = document.getElementById('globalToast');
    const body = document.getElementById('toastBody');
    if (toastEl && body) {
      body.textContent = 'Cerraste sesión';
      
      const toast = new bootstrap.Toast(toastEl, {
        autohide: true,
        delay: 3000, // <-- 3 segundos de duración
      });
      toast.show();
  }

    this.router.navigate(['/login']);
  }
}
