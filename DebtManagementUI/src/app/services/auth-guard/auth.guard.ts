import {CanActivateFn, Router} from '@angular/router';
import {TokenService} from "../token-service/token.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const token = TokenService.getToken()
  const router = inject(Router)

  if (!token) {
    router.navigate(['/login'])
    return false
  }
  return true
};
