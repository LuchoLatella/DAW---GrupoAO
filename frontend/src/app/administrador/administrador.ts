import { Component } from '@angular/core';
import { Medicos } from '../services/medicos';
import { DatePipe } from '@angular/common';
import { Reservas } from '../services/reservas';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  imports: [DatePipe],
  selector: 'app-administrador',
  styleUrl: './administrador.css',
  templateUrl: './administrador.html',
})
export class Administrador {
cargarMedicos() {
  this.medicosService.listarMedicos().subscribe({
    next: (respuesta) => {
      this.medicos = respuesta;
      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error('Error al cargar médicos:', error);
    }
  });
  
}
ngOnInit() {
  this.cargarMedicos();
  
}
  medicoId = '';
  nuevoValor: number | null = null;
  mensaje = '';
reservas: any[] = [];
medicos: any[] = [];
mostrarFormulario = false;
idPaciente = '';
idMedicoReserva = '';
fechaReserva = '';
horaReserva = '';
horariosDisponibles: string[] = [];
ahora = new Date().toISOString();
constructor(
  private medicosService: Medicos,
  private reservasService: Reservas,
  private cdr: ChangeDetectorRef
) {}

actualizarValor() {
  if (!this.medicoId || this.nuevoValor === null) {
    return;
  }

  this.medicosService
    .actualizarValorConsulta(Number(this.medicoId), this.nuevoValor)
    .subscribe({
      next: (respuesta) => {
        console.log('Valor actualizado:', respuesta);
        this.mensaje = 'Valor de consulta actualizado correctamente.';
        this.cargarMedicos();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log('Error al actualizar el valor:', error);
        this.mensaje = 'No se pudo actualizar el valor de consulta.';
        this.cdr.detectChanges();
      }
    });
}

listarReservas() {
  this.reservasService.listarTodas().subscribe({
    next: (respuesta) => {
      this.reservas = respuesta;
      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error('Error al obtener reservas:', error);
      this.mensaje = 'No se pudieron cargar las reservas.';
      this.cdr.detectChanges();
    }
  });
}
cancelarReserva(id: number) {
  if (!confirm('¿Seguro que querés cancelar esta reserva?')) {
    return;
  }

  this.reservasService.cancelarReserva(id).subscribe({
    next: () => {
      this.mensaje = 'Reserva cancelada correctamente.';
      this.listarReservas();
      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error(error);
      this.mensaje = 'No se pudo cancelar la reserva.';
      this.cdr.detectChanges();
    }
  });
}

guardarReserva() {
  if (!this.idPaciente || !this.idMedicoReserva ||
      !this.fechaReserva || !this.horaReserva) {
    this.mensaje = 'Completá todos los campos.';
    return;
  }

  const fechaHora = `${this.fechaReserva}T${this.horaReserva}:00`;

  this.reservasService.crearReservaAdmin(
    Number(this.idMedicoReserva),
    fechaHora,
    Number(this.idPaciente)
  ).subscribe({
    next: () => {
      this.idPaciente = '';
this.idMedicoReserva = '';
this.fechaReserva = '';
this.horaReserva = '';
this.horariosDisponibles = [];
      this.mensaje = 'Reserva creada correctamente.';
      this.mostrarFormulario = false;
      this.listarReservas();
      this.cdr.detectChanges();
    },
    error: (error) => {
      this.mensaje = error.error?.message || 'No se pudo crear la reserva.';
      this.cdr.detectChanges();
    }
  });
}

cargarHorarios() {
  this.horaReserva = '';
  this.horariosDisponibles = [];

  if (!this.idMedicoReserva || !this.fechaReserva) {
    return;
  }

  this.reservasService.horariosDisponibles(
    Number(this.idMedicoReserva),
    this.fechaReserva
  ).subscribe({
    next: (respuesta) => {
      this.horariosDisponibles = respuesta;
      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error('Error al consultar horarios:', error);
      this.mensaje = 'No se pudieron cargar los horarios.';
      this.cdr.detectChanges();
    }
  });
}


}