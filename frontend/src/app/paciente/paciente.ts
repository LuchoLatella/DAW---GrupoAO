import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Reservas } from '../services/reservas';
import { Medicos } from '../services/medicos';

@Component({
  selector: 'app-paciente',
  imports: [],
  templateUrl: './paciente.html',
  styleUrl: './paciente.css',
})
export class Paciente implements OnInit {

  turnos: any[] = [];
  medicos: any[] = [];

  medicoId = '';
  fecha = '';
  horarios: any[] = [];

  busquedaRealizada = false;
  mensaje = '';

  fechaMinima = '';
  fechaMaxima = '';

  constructor(
    private reservasService: Reservas,
    private medicosService: Medicos,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarMedicos();
    this.configurarFechas();
  }

  configurarFechas() {
    const hoy = new Date();

    const maxima = new Date();
    maxima.setDate(hoy.getDate() + 30);

    this.fechaMinima = hoy.toLocaleDateString('en-CA');
    this.fechaMaxima = maxima.toLocaleDateString('en-CA');
  }

  cargarMedicos() {
    this.medicosService.listarMedicos().subscribe({
      next: (respuesta) => {
        this.medicos = respuesta;

        console.log('Médicos:', respuesta);

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log('Error al obtener los médicos:', error);
      }
    });
  }

  buscarHorarios() {
    if (!this.medicoId || !this.fecha) {
      return;
    }

    this.reservasService
      .horariosDisponibles(
        Number(this.medicoId),
        this.fecha
      )
      .subscribe({
        next: (respuesta) => {
          this.horarios = respuesta;
          this.busquedaRealizada = true;

          console.log(
            'Horarios disponibles:',
            respuesta
          );

          this.cdr.detectChanges();
        },
        error: (error) => {
          console.log(
            'Error al obtener horarios:',
            error
          );
        }
      });
  }

  reservarTurno(horario: string) {
    if (!this.medicoId || !this.fecha) {
      return;
    }

    const fechaHora =
      `${this.fecha}T${horario}:00`;

    this.reservasService
      .crearReserva(
        Number(this.medicoId),
        fechaHora
      )
      .subscribe({
        next: (respuesta) => {
          console.log(
            'Reserva creada:',
            respuesta
          );

          this.mensaje =
            'Turno reservado correctamente.';

          this.buscarHorarios();

          this.cdr.detectChanges();
        },
        error: (error) => {
          console.log(
            'Error al crear la reserva:',
            error
          );

          this.mensaje =
            error.error?.message ||
            'No se pudo reservar el turno.';

          this.cdr.detectChanges();
        }
      });
  }

  verMisTurnos() {
    this.reservasService
      .misTurnos()
      .subscribe({
        next: (respuesta) => {
          this.turnos = respuesta;

          console.log(
            'Mis turnos:',
            respuesta
          );

          this.cdr.detectChanges();
        },
        error: (error) => {
          console.log(
            'Error al obtener los turnos:',
            error
          );
        }
      });
  }

  cancelarTurno(id: number) {
    this.reservasService
      .cancelarReserva(id)
      .subscribe({
        next: (respuesta) => {
          console.log(
            'Reserva cancelada:',
            respuesta
          );

          this.mensaje =
            'Turno cancelado correctamente.';

          this.verMisTurnos();

          if (this.medicoId && this.fecha) {
            this.buscarHorarios();
          }

          this.cdr.detectChanges();
        },
        error: (error) => {
          console.log(
            'Error al cancelar la reserva:',
            error
          );

          this.mensaje =
            error.error?.message ||
            'No se pudo cancelar el turno.';

          this.cdr.detectChanges();
        }
      });
  }

  formatearFecha(fechaHora: string) {
    const fecha = new Date(fechaHora);

    return fecha.toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }
}