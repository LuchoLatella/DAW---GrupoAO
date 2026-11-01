import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Reservas {

  constructor(private http: HttpClient) {}

  misTurnos() {
    return this.http.get<any[]>('/api/reservas/mis-turnos');
  }

  turnosMedico(fecha: string) {
    return this.http.get<any[]>(
      `/api/reservas/mis-turnos?fecha=${fecha}`
    );
  }

  cambiarEstado(id: number, estado: string) {
    return this.http.patch(
      `/api/reservas/${id}/estado`,
      { estado: estado }
    );
  }
}