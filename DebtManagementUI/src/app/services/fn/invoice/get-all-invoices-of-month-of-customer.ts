/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Invoice } from '../../models/invoice';

export interface GetAllInvoicesOfMonthOfCustomer$Params {
  year: number;
  month: number;
  customerId: string;
}

export function getAllInvoicesOfMonthOfCustomer(http: HttpClient, rootUrl: string, params: GetAllInvoicesOfMonthOfCustomer$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Invoice>>> {
  const rb = new RequestBuilder(rootUrl, getAllInvoicesOfMonthOfCustomer.PATH, 'get');
  if (params) {
    rb.path('year', params.year, {});
    rb.path('month', params.month, {});
    rb.path('customerId', params.customerId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Invoice>>;
    })
  );
}

getAllInvoicesOfMonthOfCustomer.PATH = '/invoices/years/{year}/months/{month}/customers/{customerId}';
