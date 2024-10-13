/* tslint:disable */
/* eslint-disable */
import { Product } from '../models/product';
import { Specification } from '../models/specification';
export interface InvoiceLine {
  id?: number;
  note?: string;
  numberOfBoxes?: number;
  product?: Product;
  specification?: Specification;
  total?: number;
}
