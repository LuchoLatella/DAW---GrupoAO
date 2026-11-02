import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const usuarioGuardado = localStorage.getItem('usuario');

  if (!token || !usuarioGuardado) {
    router.navigate(['/']);
    return false;
  }

  const usuario = JSON.parse(usuarioGuardado);
  const rolPermitido = route.data['rol'];

  if (rolPermitido && usuario.rol !== rolPermitido) {
    router.navigate(['/']);
    return false;
  }

  return true;
};