import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public static saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  public static getToken(): string {
    const authToken = localStorage.getItem('token')
    if (authToken && TokenService.isTokenValid()) {
      return authToken
    }
    return ''
  }

  public static deleteToken(): void {
    localStorage.clear()
  }

  private static isTokenValid() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    // decode the token
    const jwtHelper = new JwtHelperService();
    // check expiry date
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }
}
