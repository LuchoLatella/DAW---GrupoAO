import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Reservas {

  constructor(private http: HttpClient) {}

  misTurnos() {
  return this.http.get<any[]>('/api/reservas/mis-reservas');
  }

  horariosDisponibles(idMedico: number, fecha: string) {
    return this.http.get<any[]>(
      `/api/reservas/disponibles?id_medico=${idMedico}&fecha=${fecha}`
    );
  }

  crearReserva(idMedico: number, fechaHora: string) {
    return this.http.post(
      '/api/reservas',
      {
        id_medico: idMedico,
        fecha_hora: fechaHora
      }
    );
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

  cancelarReserva(id: number) {
  return this.http.patch(
    `/api/reservas/${id}/cancelar`,
    {}
  );
  }

  listarTodas() {
  return this.http.get<any[]>('/api/reservas');
}

crearReservaAdmin(
  idMedico: number,
  fechaHora: string,
  idPaciente: number
) {
  return this.http.post('/api/reservas', {
    id_medico: idMedico,
    fecha_hora: fechaHora,
    id_paciente: idPaciente
  });
}

}