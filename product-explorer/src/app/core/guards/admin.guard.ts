import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { APP_STORAGE_KEYS } from '../../shared/constants/app.constants';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const hasAdminAccess = localStorage.getItem(APP_STORAGE_KEYS.isAdmin) === 'true';

  if (hasAdminAccess) {
    return true;
  }

  return router.createUrlTree(['/catalog'], {
    queryParams: { denied: 'admin' }
  });
};
