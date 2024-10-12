import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {CustomMatPaginatorIntl} from "./modules/debt-management/custom/CustomMatPaginator";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {provideMomentDateAdapter} from "@angular/material-moment-adapter";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideMomentDateAdapter(MY_FORMATS),
    {provide: MAT_DATE_LOCALE, useValue: 'vi'},
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    },
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ]
};
