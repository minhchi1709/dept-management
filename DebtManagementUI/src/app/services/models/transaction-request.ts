/* tslint:disable */
/* eslint-disable */
import { Specification } from '../models/specification';
export interface TransactionRequest {
  id?: number;
  note?: string;
  numberOfBoxes?: number;
  productId?: string;
  specification?: Specification;
}
