import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = localStorage.getItem('user');
  const token = JSON.parse(user || '');
  console.warn(user);
  console.warn('token', token);
  console.warn(token.user.role);

  if (!token) {
    router.navigate(['/signin']);
    return false;
  }
  if (token.user.role != 'admin') {
    alert('Cut ra cho khac');
    return false;
  }
  return true;
};
