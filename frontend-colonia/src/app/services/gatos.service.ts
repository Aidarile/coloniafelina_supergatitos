import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gato } from '../common/interfacegatos';

@Injectable({
  providedIn: 'root'
})
export class GatosService {
  private apiUrl = 'http://localhost:3000/gatos';

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Gato[]> {
    return this.http.get<Gato[]>(this.apiUrl);
  }

  crearGato(gato: Gato): Observable<Gato> {
    return this.http.post<Gato>(this.apiUrl, gato);
  }

  actualizarGato(id: string, gato: Gato): Observable<Gato> {
    return this.http.put<Gato>(`${this.apiUrl}/${id}`, gato);
  }
  
  eliminarGato(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}