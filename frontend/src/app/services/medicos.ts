import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Medicos {

  constructor(private http: HttpClient) {}

  actualizarValorConsulta(id: number, valorConsulta: number) {
    return this.http.patch(
      `/api/medicos/${id}/valor-consulta`,
      { valorConsulta: valorConsulta }
    );
  }
}