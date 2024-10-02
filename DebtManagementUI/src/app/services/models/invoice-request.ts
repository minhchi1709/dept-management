/* tslint:disable */
/* eslint-disable */
import { TransactionRequest } from '../models/transaction-request';
export interface InvoiceRequest {
  customerId?: string;
  date?: string;
  id?: string;
  transactions?: Array<TransactionRequest>;
}
