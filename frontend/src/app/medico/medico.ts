import { Component } from '@angular/core';
import { Reservas } from '../services/reservas';

@Component({
  imports: [],
  selector: 'app-medico',
  styleUrl: './medico.css',
  templateUrl: './medico.html',
})
export class Medico {

  fecha = '';
  turnos: any[] = [];

  constructor(private reservasService: Reservas) {}

  buscarTurnos() {
    if (!this.fecha) {
      return;
    }

    this.reservasService.turnosMedico(this.fecha).subscribe({
      next: (respuesta) => {
        this.turnos = respuesta;
        console.log('Turnos del médico:', respuesta);
      },
      error: (error) => {
        console.log('Error al obtener los turnos:', error);
      }
    });
  }

  cambiarEstado(id: number, estado: string) {
    this.reservasService.cambiarEstado(id, estado).subscribe({
      next: () => {
        this.buscarTurnos();
      },
      error: (error) => {
        console.log('Error al cambiar el estado:', error);
      }
    });
  }

}