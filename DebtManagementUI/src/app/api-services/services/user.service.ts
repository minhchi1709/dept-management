/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getAllAdmins } from '../fn/user/get-all-admins';
import { GetAllAdmins$Params } from '../fn/user/get-all-admins';
import { getAllUsers } from '../fn/user/get-all-users';
import { GetAllUsers$Params } from '../fn/user/get-all-users';
import { User } from '../models/user';
import { UserResponse } from '../models/user-response';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllUsers()` */
  static readonly GetAllUsersPath = '/app/DebtManagement/api/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Response(params?: GetAllUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserResponse>>> {
    return getAllUsers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers(params?: GetAllUsers$Params, context?: HttpContext): Observable<Array<UserResponse>> {
    return this.getAllUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserResponse>>): Array<UserResponse> => r.body)
    );
  }

  /** Path part for operation `getAllAdmins()` */
  static readonly GetAllAdminsPath = '/app/DebtManagement/api/users/admin';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAdmins()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAdmins$Response(params?: GetAllAdmins$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<User>>> {
    return getAllAdmins(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllAdmins$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAdmins(params?: GetAllAdmins$Params, context?: HttpContext): Observable<Array<User>> {
    return this.getAllAdmins$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<User>>): Array<User> => r.body)
    );
  }

}
