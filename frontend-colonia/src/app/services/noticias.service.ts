import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private apiUrl = `${environment.apiBaseUrl}/noticias`;

  constructor(private http: HttpClient) {}

  obtenerTodas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearNoticia(noticia: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, noticia);
  }

  actualizarNoticia(id: string, noticia: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, noticia);
  }

  eliminarNoticia(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
