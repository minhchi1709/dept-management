/* tslint:disable */
/* eslint-disable */
import { CustomerResponse } from '../models/customer-response';
import { InvoiceLine } from '../models/invoice-line';
export interface InvoiceResponse {
  customer?: CustomerResponse;
  date?: string;
  id?: string;
  invoiceLines?: Array<InvoiceLine>;
  total?: number;
}
