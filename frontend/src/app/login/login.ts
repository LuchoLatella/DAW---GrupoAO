import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  documento = '';
  clave = '';

  constructor(private auth: Auth) {}

 iniciarSesion() {
  this.auth.login(this.documento, this.clave).subscribe({
    next: (respuesta) => {
      console.log('Login correcto:', respuesta);
    },
    error: (error) => {
      console.log('Error en el login:', error);
    }
  });
}
}