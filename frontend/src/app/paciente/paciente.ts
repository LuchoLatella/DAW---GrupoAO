import { Component } from '@angular/core';
import { Reservas } from '../services/reservas';

@Component({
  selector: 'app-paciente',
  imports: [],
  templateUrl: './paciente.html',
  styleUrl: './paciente.css',
})
export class Paciente {

  turnos: any[] = [];

  constructor(private reservasService: Reservas) {}

  verMisTurnos() {
    this.reservasService.misTurnos().subscribe({
      next: (respuesta) => {
        this.turnos = respuesta;
        console.log('Mis turnos:', respuesta);
      },
      error: (error) => {
        console.log('Error al obtener los turnos:', error);
      }
    });
  }

}