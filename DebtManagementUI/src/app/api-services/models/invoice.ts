/* tslint:disable */
/* eslint-disable */
import { Customer } from '../models/customer';
import { InvoiceLine } from '../models/invoice-line';
export interface Invoice {
  customer?: Customer;
  date?: string;
  id?: string;
  invoiceLines?: Array<InvoiceLine>;
  total?: number;
}
