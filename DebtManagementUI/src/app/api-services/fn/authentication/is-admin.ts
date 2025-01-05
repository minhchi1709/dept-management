/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BasicResponseBoolean } from '../../models/basic-response-boolean';

export interface IsAdmin$Params {
}

export function isAdmin(http: HttpClient, rootUrl: string, params?: IsAdmin$Params, context?: HttpContext): Observable<StrictHttpResponse<BasicResponseBoolean>> {
  const rb = new RequestBuilder(rootUrl, isAdmin.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BasicResponseBoolean>;
    })
  );
}

isAdmin.PATH = '/app/DebtManagement/api/auth/admin';
