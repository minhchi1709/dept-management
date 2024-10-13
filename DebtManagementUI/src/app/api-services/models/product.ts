/* tslint:disable */
/* eslint-disable */
import { Specification } from '../models/specification';
export interface Product {
  id?: number;
  name?: string;
  productId?: string;
  specifications?: Array<Specification>;
}
