import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth-service/auth.service'; 
import { map, take } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAdmin$.pipe(
    take(1),
    map((isAdmin) => {
      if (isAdmin) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};
