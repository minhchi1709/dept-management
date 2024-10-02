/* tslint:disable */
/* eslint-disable */
import { Customer } from '../models/customer';
import { Transaction } from '../models/transaction';
export interface Invoice {
  customer?: Customer;
  date?: string;
  id?: string;
  lastModified?: string;
  paid?: boolean;
  paidAmount?: number;
  rest?: number;
  total?: number;
  transactions?: Array<Transaction>;
}
