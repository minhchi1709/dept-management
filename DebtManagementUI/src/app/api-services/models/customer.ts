/* tslint:disable */
/* eslint-disable */
import { Invoice } from '../models/invoice';
export interface Customer {
  customerId?: string;
  id?: number;
  invoices?: Array<Invoice>;
  name?: string;
  province?: string;
  telephone?: string;
}
