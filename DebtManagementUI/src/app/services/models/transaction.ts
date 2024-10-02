/* tslint:disable */
/* eslint-disable */
import { Invoice } from '../models/invoice';
import { Product } from '../models/product';
export interface Transaction {
  id?: number;
  invoice?: Invoice;
  lastModified?: string;
  note?: string;
  numberOfBoxes?: number;
  product?: Product;
  total?: number;
}
