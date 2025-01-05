/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface SetNewPassword$Params {
  newPassword: string;
  userId: string;
}

export function setNewPassword(http: HttpClient, rootUrl: string, params: SetNewPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, setNewPassword.PATH, 'put');
  if (params) {
    rb.query('newPassword', params.newPassword, {});
    rb.query('userId', params.userId, {});
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

setNewPassword.PATH = '/app/DebtManagement/api/auth/set-new-password';
