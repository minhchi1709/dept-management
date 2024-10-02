/* tslint:disable */
/* eslint-disable */
import { Invoice } from '../models/invoice';
export interface Customer {
  id?: string;
  invoices?: Array<Invoice>;
  name?: string;
  province?: string;
  telephone?: string;
}
