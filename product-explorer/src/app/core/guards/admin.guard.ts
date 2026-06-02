import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const hasAdminAccess = localStorage.getItem('productExplorer.isAdmin') === 'true';

  if (hasAdminAccess) {
    return true;
  }

  return router.createUrlTree(['/catalog'], {
    queryParams: { denied: 'admin' }
  });
};
