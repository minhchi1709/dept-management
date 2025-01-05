/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createCustomer } from '../fn/customer/create-customer';
import { CreateCustomer$Params } from '../fn/customer/create-customer';
import { Customer } from '../models/customer';
import { deleteCustomer } from '../fn/customer/delete-customer';
import { DeleteCustomer$Params } from '../fn/customer/delete-customer';
import { getAllCustomerIds } from '../fn/customer/get-all-customer-ids';
import { GetAllCustomerIds$Params } from '../fn/customer/get-all-customer-ids';
import { getAllCustomers } from '../fn/customer/get-all-customers';
import { GetAllCustomers$Params } from '../fn/customer/get-all-customers';
import { getCustomerById } from '../fn/customer/get-customer-by-id';
import { GetCustomerById$Params } from '../fn/customer/get-customer-by-id';
import { updateCustomer } from '../fn/customer/update-customer';
import { UpdateCustomer$Params } from '../fn/customer/update-customer';

@Injectable({ providedIn: 'root' })
export class CustomerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getCustomerById()` */
  static readonly GetCustomerByIdPath = '/app/DebtManagement/api/customers/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCustomerById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCustomerById$Response(params: GetCustomerById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getCustomerById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCustomerById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCustomerById(params: GetCustomerById$Params, context?: HttpContext): Observable<{
}> {
    return this.getCustomerById$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `updateCustomer()` */
  static readonly UpdateCustomerPath = '/app/DebtManagement/api/customers/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCustomer()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCustomer$Response(params: UpdateCustomer$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return updateCustomer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCustomer$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCustomer(params: UpdateCustomer$Params, context?: HttpContext): Observable<{
}> {
    return this.updateCustomer$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `deleteCustomer()` */
  static readonly DeleteCustomerPath = '/app/DebtManagement/api/customers/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCustomer()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCustomer$Response(params: DeleteCustomer$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteCustomer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCustomer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCustomer(params: DeleteCustomer$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteCustomer$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getAllCustomers()` */
  static readonly GetAllCustomersPath = '/app/DebtManagement/api/customers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCustomers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCustomers$Response(params?: GetAllCustomers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Customer>>> {
    return getAllCustomers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCustomers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCustomers(params?: GetAllCustomers$Params, context?: HttpContext): Observable<Array<Customer>> {
    return this.getAllCustomers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Customer>>): Array<Customer> => r.body)
    );
  }

  /** Path part for operation `createCustomer()` */
  static readonly CreateCustomerPath = '/app/DebtManagement/api/customers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCustomer()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCustomer$Response(params: CreateCustomer$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return createCustomer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createCustomer$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCustomer(params: CreateCustomer$Params, context?: HttpContext): Observable<{
}> {
    return this.createCustomer$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getAllCustomerIds()` */
  static readonly GetAllCustomerIdsPath = '/app/DebtManagement/api/customers/customer-ids';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCustomerIds()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCustomerIds$Response(params?: GetAllCustomerIds$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<string>>> {
    return getAllCustomerIds(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCustomerIds$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCustomerIds(params?: GetAllCustomerIds$Params, context?: HttpContext): Observable<Array<string>> {
    return this.getAllCustomerIds$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<string>>): Array<string> => r.body)
    );
  }

}
