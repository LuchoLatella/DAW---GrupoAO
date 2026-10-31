import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Paciente } from './paciente/paciente';
import { Medico } from './medico/medico';
import { Administrador } from './administrador/administrador';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'paciente', component: Paciente },
  { path: 'medico', component: Medico },
  { path: 'administrador', component: Administrador }
];