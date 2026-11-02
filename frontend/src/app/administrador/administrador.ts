import { Component } from '@angular/core';
import { Medicos } from '../services/medicos';

@Component({
  imports: [],
  selector: 'app-administrador',
  styleUrl: './administrador.css',
  templateUrl: './administrador.html',
})
export class Administrador {

  medicoId = '';
  nuevoValor: number | null = null;
  mensaje = '';

  constructor(private medicosService: Medicos) {}

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
        },
        error: (error) => {
          console.log('Error al actualizar el valor:', error);
          this.mensaje = 'No se pudo actualizar el valor de consulta.';
        }
      });
  }

}