/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface ChangePassword$Params {
  oldPassword: string;
  newPassword: string;
}

export function changePassword(http: HttpClient, rootUrl: string, params: ChangePassword$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, changePassword.PATH, 'put');
  if (params) {
    rb.query('oldPassword', params.oldPassword, {});
    rb.query('newPassword', params.newPassword, {});
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

changePassword.PATH = '/app/DebtManagement/api/auth/change-password';
