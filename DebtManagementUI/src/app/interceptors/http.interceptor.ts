import { HttpInterceptorFn } from '@angular/common/http';
import {TokenService} from "../services/token-service/token.service";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const token = TokenService.getToken()
  if (token) {
    const cloneRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloneRequest)
  }

  return next(req);
};
