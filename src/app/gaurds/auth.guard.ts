import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  let auth = inject(AuthService);
  let router = inject(Router)
  if (await auth.getLoggedInUser().user?.id) {
    return true
  }else{
    router.navigate(['/login'])    
    return false
  }
};
