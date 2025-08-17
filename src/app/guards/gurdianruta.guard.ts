import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const gurdianrutaGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = localStorage.getItem('user');

  if (user) {
    return true; // Usuario logueado, permite entrar
  } else {
    alert('Debes iniciar sesión para acceder a esta página');
    return router.parseUrl('/login'); // Redirige al login
  }
};
