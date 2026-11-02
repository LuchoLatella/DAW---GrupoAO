import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  documento = '';
  clave = '';

  mensajeError = signal('');

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  iniciarSesion() {

    this.mensajeError.set('');

    this.auth.login(this.documento, this.clave).subscribe({
      next: (respuesta: any) => {
        console.log('Login correcto:', respuesta);

        localStorage.setItem('token', respuesta.access_token);
        localStorage.setItem(
          'usuario',
          JSON.stringify(respuesta.usuario)
        );

        if (respuesta.usuario.rol === 'PACIENTE') {
          this.router.navigate(['/paciente']);
        } else if (respuesta.usuario.rol === 'MEDICO') {
          this.router.navigate(['/medico']);
        } else if (respuesta.usuario.rol === 'ADMINISTRADOR') {
          this.router.navigate(['/administrador']);
        }
      },

      error: (error) => {
        console.log('Error en el login:', error);

        this.mensajeError.set(
          'Documento o contraseña incorrectos.'
        );
      }
    });
  }
}