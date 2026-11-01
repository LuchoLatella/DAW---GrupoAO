import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Paciente } from './paciente/paciente';
import { Medico } from './medico/medico';
import { Administrador } from './administrador/administrador';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Login },

  {
    path: 'paciente',
    component: Paciente,
    canActivate: [authGuard],
    data: { rol: 'PACIENTE' }
  },

  {
    path: 'medico',
    component: Medico,
    canActivate: [authGuard],
    data: { rol: 'MEDICO' }
  },

  {
    path: 'administrador',
    component: Administrador,
    canActivate: [authGuard],
    data: { rol: 'ADMINISTRADOR' }
  }
];