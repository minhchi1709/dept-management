/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createInvoice } from '../fn/invoice/create-invoice';
import { CreateInvoice$Params } from '../fn/invoice/create-invoice';
import { deleteInvoice } from '../fn/invoice/delete-invoice';
import { DeleteInvoice$Params } from '../fn/invoice/delete-invoice';
import { getAllInvoices } from '../fn/invoice/get-all-invoices';
import { GetAllInvoices$Params } from '../fn/invoice/get-all-invoices';
import { getAllInvoicesOfCustomer } from '../fn/invoice/get-all-invoices-of-customer';
import { GetAllInvoicesOfCustomer$Params } from '../fn/invoice/get-all-invoices-of-customer';
import { getInvoiceById } from '../fn/invoice/get-invoice-by-id';
import { GetInvoiceById$Params } from '../fn/invoice/get-invoice-by-id';
import { InvoiceResponse } from '../models/invoice-response';

@Injectable({ providedIn: 'root' })
export class InvoiceService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllInvoices()` */
  static readonly GetAllInvoicesPath = '/invoices';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllInvoices()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInvoices$Response(params?: GetAllInvoices$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<InvoiceResponse>>> {
    return getAllInvoices(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllInvoices$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInvoices(params?: GetAllInvoices$Params, context?: HttpContext): Observable<Array<InvoiceResponse>> {
    return this.getAllInvoices$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<InvoiceResponse>>): Array<InvoiceResponse> => r.body)
    );
  }

  /** Path part for operation `createInvoice()` */
  static readonly CreateInvoicePath = '/invoices';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createInvoice()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createInvoice$Response(params: CreateInvoice$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return createInvoice(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createInvoice$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createInvoice(params: CreateInvoice$Params, context?: HttpContext): Observable<{
}> {
    return this.createInvoice$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getInvoiceById()` */
  static readonly GetInvoiceByIdPath = '/invoices/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getInvoiceById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInvoiceById$Response(params: GetInvoiceById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getInvoiceById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getInvoiceById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInvoiceById(params: GetInvoiceById$Params, context?: HttpContext): Observable<{
}> {
    return this.getInvoiceById$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `deleteInvoice()` */
  static readonly DeleteInvoicePath = '/invoices/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteInvoice()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteInvoice$Response(params: DeleteInvoice$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteInvoice(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteInvoice$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteInvoice(params: DeleteInvoice$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteInvoice$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getAllInvoicesOfCustomer()` */
  static readonly GetAllInvoicesOfCustomerPath = '/invoices/customers/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllInvoicesOfCustomer()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInvoicesOfCustomer$Response(params: GetAllInvoicesOfCustomer$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<InvoiceResponse>>> {
    return getAllInvoicesOfCustomer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllInvoicesOfCustomer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInvoicesOfCustomer(params: GetAllInvoicesOfCustomer$Params, context?: HttpContext): Observable<Array<InvoiceResponse>> {
    return this.getAllInvoicesOfCustomer$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<InvoiceResponse>>): Array<InvoiceResponse> => r.body)
    );
  }

}
