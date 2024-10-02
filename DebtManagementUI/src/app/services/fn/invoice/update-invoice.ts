/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { InvoiceRequest } from '../../models/invoice-request';
import { TransactionRequest } from '../../models/transaction-request';

export interface UpdateInvoice$Params {
  invoiceId: string;
  transactionId: number;
  option: string;
      body: {
'invoiceRequest'?: InvoiceRequest;
'transactionRequest'?: TransactionRequest;
}
}

export function updateInvoice(http: HttpClient, rootUrl: string, params: UpdateInvoice$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, updateInvoice.PATH, 'put');
  if (params) {
    rb.path('invoiceId', params.invoiceId, {});
    rb.query('transactionId', params.transactionId, {});
    rb.query('option', params.option, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

updateInvoice.PATH = '/invoices/{invoiceId}';
