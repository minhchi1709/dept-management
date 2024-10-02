/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Invoice } from '../../models/invoice';

export interface GetAllInvoicesOfYear$Params {
  year: number;
}

export function getAllInvoicesOfYear(http: HttpClient, rootUrl: string, params: GetAllInvoicesOfYear$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Invoice>>> {
  const rb = new RequestBuilder(rootUrl, getAllInvoicesOfYear.PATH, 'get');
  if (params) {
    rb.path('year', params.year, {});
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

getAllInvoicesOfYear.PATH = '/invoices/years/{year}';
