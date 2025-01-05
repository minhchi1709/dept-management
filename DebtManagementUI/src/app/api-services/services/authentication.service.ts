/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AuthenticationResponse } from '../models/authentication-response';
import { BasicResponseBoolean } from '../models/basic-response-boolean';
import { BasicResponseString } from '../models/basic-response-string';
import { changePassword } from '../fn/authentication/change-password';
import { ChangePassword$Params } from '../fn/authentication/change-password';
import { deleteUser } from '../fn/authentication/delete-user';
import { DeleteUser$Params } from '../fn/authentication/delete-user';
import { getCurrentUser } from '../fn/authentication/get-current-user';
import { GetCurrentUser$Params } from '../fn/authentication/get-current-user';
import { isAdmin } from '../fn/authentication/is-admin';
import { IsAdmin$Params } from '../fn/authentication/is-admin';
import { login } from '../fn/authentication/login';
import { Login$Params } from '../fn/authentication/login';
import { register } from '../fn/authentication/register';
import { Register$Params } from '../fn/authentication/register';
import { setNewPassword } from '../fn/authentication/set-new-password';
import { SetNewPassword$Params } from '../fn/authentication/set-new-password';
import { UserResponse } from '../models/user-response';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `setNewPassword()` */
  static readonly SetNewPasswordPath = '/app/DebtManagement/api/auth/set-new-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setNewPassword()` instead.
   *
   * This method doesn't expect any request body.
   */
  setNewPassword$Response(params: SetNewPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return setNewPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setNewPassword$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  setNewPassword(params: SetNewPassword$Params, context?: HttpContext): Observable<{
}> {
    return this.setNewPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `changePassword()` */
  static readonly ChangePasswordPath = '/app/DebtManagement/api/auth/change-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changePassword()` instead.
   *
   * This method doesn't expect any request body.
   */
  changePassword$Response(params: ChangePassword$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return changePassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changePassword$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  changePassword(params: ChangePassword$Params, context?: HttpContext): Observable<{
}> {
    return this.changePassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/app/DebtManagement/api/auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<BasicResponseString>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: Register$Params, context?: HttpContext): Observable<BasicResponseString> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<BasicResponseString>): BasicResponseString => r.body)
    );
  }

  /** Path part for operation `login()` */
  static readonly LoginPath = '/app/DebtManagement/api/auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: Login$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return login(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: Login$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.login$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `getCurrentUser()` */
  static readonly GetCurrentUserPath = '/app/DebtManagement/api/auth';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCurrentUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentUser$Response(params?: GetCurrentUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
    return getCurrentUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCurrentUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentUser(params?: GetCurrentUser$Params, context?: HttpContext): Observable<UserResponse> {
    return this.getCurrentUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserResponse>): UserResponse => r.body)
    );
  }

  /** Path part for operation `deleteUser()` */
  static readonly DeleteUserPath = '/app/DebtManagement/api/auth';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Response(params: DeleteUser$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser(params: DeleteUser$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `isAdmin()` */
  static readonly IsAdminPath = '/app/DebtManagement/api/auth/admin';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `isAdmin()` instead.
   *
   * This method doesn't expect any request body.
   */
  isAdmin$Response(params?: IsAdmin$Params, context?: HttpContext): Observable<StrictHttpResponse<BasicResponseBoolean>> {
    return isAdmin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `isAdmin$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  isAdmin(params?: IsAdmin$Params, context?: HttpContext): Observable<BasicResponseBoolean> {
    return this.isAdmin$Response(params, context).pipe(
      map((r: StrictHttpResponse<BasicResponseBoolean>): BasicResponseBoolean => r.body)
    );
  }

}
