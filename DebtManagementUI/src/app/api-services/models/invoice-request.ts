/* tslint:disable */
/* eslint-disable */
import { InvoiceLineRequest } from '../models/invoice-line-request';
export interface InvoiceRequest {
  customerId?: string;
  date?: string;
  id?: string;
  invoiceLines?: Array<InvoiceLineRequest>;
}
