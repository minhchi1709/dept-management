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
import { getAllInvoicesOfMonth } from '../fn/invoice/get-all-invoices-of-month';
import { GetAllInvoicesOfMonth$Params } from '../fn/invoice/get-all-invoices-of-month';
import { getAllInvoicesOfMonthOfCustomer } from '../fn/invoice/get-all-invoices-of-month-of-customer';
import { GetAllInvoicesOfMonthOfCustomer$Params } from '../fn/invoice/get-all-invoices-of-month-of-customer';
import { getAllInvoicesOfYear } from '../fn/invoice/get-all-invoices-of-year';
import { GetAllInvoicesOfYear$Params } from '../fn/invoice/get-all-invoices-of-year';
import { getAllInvoicesOfYearOfCustomer } from '../fn/invoice/get-all-invoices-of-year-of-customer';
import { GetAllInvoicesOfYearOfCustomer$Params } from '../fn/invoice/get-all-invoices-of-year-of-customer';
import { getAllMonthsOfYear } from '../fn/invoice/get-all-months-of-year';
import { GetAllMonthsOfYear$Params } from '../fn/invoice/get-all-months-of-year';
import { getAllYears } from '../fn/invoice/get-all-years';
import { GetAllYears$Params } from '../fn/invoice/get-all-years';
import { getInvoiceById } from '../fn/invoice/get-invoice-by-id';
import { GetInvoiceById$Params } from '../fn/invoice/get-invoice-by-id';
import { Invoice } from '../models/invoice';
import { payInvoice } from '../fn/invoice/pay-invoice';
import { PayInvoice$Params } from '../fn/invoice/pay-invoice';
import { updateInvoice } from '../fn/invoice/update-invoice';
import { UpdateInvoice$Params } from '../fn/invoice/update-invoice';

@Injectable({ providedIn: 'root' })
export class InvoiceService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateInvoice()` */
  static readonly UpdateInvoicePath = '/invoices/{invoiceId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateInvoice()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateInvoice$Response(params: UpdateInvoice$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return updateInvoice(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateInvoice$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateInvoice(params: UpdateInvoice$Params, context?: HttpContext): Observable<{
}> {
    return this.updateInvoice$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getAllInvoices()` */
  static readonly GetAllInvoicesPath = '/invoices';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllInvoices()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInvoices$Response(params?: GetAllInvoices$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Invoice>>> {
    return getAllInvoices(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllInvoices$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInvoices(params?: GetAllInvoices$Params, context?: HttpContext): Observable<Array<Invoice>> {
    return this.getAllInvoices$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Invoice>>): Array<Invoice> => r.body)
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

  /** Path part for operation `payInvoice()` */
  static readonly PayInvoicePath = '/invoices/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `payInvoice()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  payInvoice$Response(params: PayInvoice$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return payInvoice(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `payInvoice$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  payInvoice(params: PayInvoice$Params, context?: HttpContext): Observable<{
}> {
    return this.payInvoice$Response(params, context).pipe(
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

  /** Path part for operation `getAllYears()` */
  static readonly GetAllYearsPath = '/invoices/years';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllYears()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllYears$Response(params?: GetAllYears$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<number>>> {
    return getAllYears(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllYears$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllYears(params?: GetAllYears$Params, context?: HttpContext): Observable<Array<number>> {
    return this.getAllYears$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<number>>): Array<number> => r.body)
    );
  }

  /** Path part for operation `getAllInvoicesOfYear()` */
  static readonly GetAllInvoicesOfYearPath = '/invoices/years/{year}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllInvoicesOfYear()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInvoicesOfYear$Response(params: GetAllInvoicesOfYear$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Invoice>>> {
    return getAllInvoicesOfYear(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllInvoicesOfYear$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInvoicesOfYear(params: GetAllInvoicesOfYear$Params, context?: HttpContext): Observable<Array<Invoice>> {
    return this.getAllInvoicesOfYear$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Invoice>>): Array<Invoice> => r.body)
    );
  }

  /** Path part for operation `getAllMonthsOfYear()` */
  static readonly GetAllMonthsOfYearPath = '/invoices/years/{year}/months';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllMonthsOfYear()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllMonthsOfYear$Response(params: GetAllMonthsOfYear$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<number>>> {
    return getAllMonthsOfYear(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllMonthsOfYear$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllMonthsOfYear(params: GetAllMonthsOfYear$Params, context?: HttpContext): Observable<Array<number>> {
    return this.getAllMonthsOfYear$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<number>>): Array<number> => r.body)
    );
  }

  /** Path part for operation `getAllInvoicesOfMonth()` */
  static readonly GetAllInvoicesOfMonthPath = '/invoices/years/{year}/months/{month}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllInvoicesOfMonth()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInvoicesOfMonth$Response(params: GetAllInvoicesOfMonth$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Invoice>>> {
    return getAllInvoicesOfMonth(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllInvoicesOfMonth$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInvoicesOfMonth(params: GetAllInvoicesOfMonth$Params, context?: HttpContext): Observable<Array<Invoice>> {
    return this.getAllInvoicesOfMonth$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Invoice>>): Array<Invoice> => r.body)
    );
  }

  /** Path part for operation `getAllInvoicesOfMonthOfCustomer()` */
  static readonly GetAllInvoicesOfMonthOfCustomerPath = '/invoices/years/{year}/months/{month}/customers/{customerId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllInvoicesOfMonthOfCustomer()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInvoicesOfMonthOfCustomer$Response(params: GetAllInvoicesOfMonthOfCustomer$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Invoice>>> {
    return getAllInvoicesOfMonthOfCustomer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllInvoicesOfMonthOfCustomer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInvoicesOfMonthOfCustomer(params: GetAllInvoicesOfMonthOfCustomer$Params, context?: HttpContext): Observable<Array<Invoice>> {
    return this.getAllInvoicesOfMonthOfCustomer$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Invoice>>): Array<Invoice> => r.body)
    );
  }

  /** Path part for operation `getAllInvoicesOfYearOfCustomer()` */
  static readonly GetAllInvoicesOfYearOfCustomerPath = '/invoices/years/{year}/customers/{customerId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllInvoicesOfYearOfCustomer()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInvoicesOfYearOfCustomer$Response(params: GetAllInvoicesOfYearOfCustomer$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Invoice>>> {
    return getAllInvoicesOfYearOfCustomer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllInvoicesOfYearOfCustomer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInvoicesOfYearOfCustomer(params: GetAllInvoicesOfYearOfCustomer$Params, context?: HttpContext): Observable<Array<Invoice>> {
    return this.getAllInvoicesOfYearOfCustomer$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Invoice>>): Array<Invoice> => r.body)
    );
  }

}
