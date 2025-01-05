/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Specification } from '../../models/specification';

export interface GetAllSpecifications$Params {
}

export function getAllSpecifications(http: HttpClient, rootUrl: string, params?: GetAllSpecifications$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Specification>>> {
  const rb = new RequestBuilder(rootUrl, getAllSpecifications.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Specification>>;
    })
  );
}

getAllSpecifications.PATH = '/app/DebtManagement/api/products/specifications';
