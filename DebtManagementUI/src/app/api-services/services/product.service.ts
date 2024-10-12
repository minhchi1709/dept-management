/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createProduct } from '../fn/product/create-product';
import { CreateProduct$Params } from '../fn/product/create-product';
import { deleteProduct } from '../fn/product/delete-product';
import { DeleteProduct$Params } from '../fn/product/delete-product';
import { deleteSpecification } from '../fn/product/delete-specification';
import { DeleteSpecification$Params } from '../fn/product/delete-specification';
import { getAllProductIds } from '../fn/product/get-all-product-ids';
import { GetAllProductIds$Params } from '../fn/product/get-all-product-ids';
import { getAllProducts } from '../fn/product/get-all-products';
import { GetAllProducts$Params } from '../fn/product/get-all-products';
import { getAllSpecifications } from '../fn/product/get-all-specifications';
import { GetAllSpecifications$Params } from '../fn/product/get-all-specifications';
import { getProductById } from '../fn/product/get-product-by-id';
import { GetProductById$Params } from '../fn/product/get-product-by-id';
import { Product } from '../models/product';
import { Specification } from '../models/specification';
import { updateProduct } from '../fn/product/update-product';
import { UpdateProduct$Params } from '../fn/product/update-product';

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getProductById()` */
  static readonly GetProductByIdPath = '/products/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductById$Response(params: GetProductById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return getProductById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProductById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductById(params: GetProductById$Params, context?: HttpContext): Observable<{
}> {
    return this.getProductById$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `updateProduct()` */
  static readonly UpdateProductPath = '/products/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProduct()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProduct$Response(params: UpdateProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return updateProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateProduct$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProduct(params: UpdateProduct$Params, context?: HttpContext): Observable<{
}> {
    return this.updateProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `deleteProduct()` */
  static readonly DeleteProductPath = '/products/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProduct()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProduct$Response(params: DeleteProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteProduct$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProduct(params: DeleteProduct$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getAllProducts()` */
  static readonly GetAllProductsPath = '/products';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllProducts()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProducts$Response(params?: GetAllProducts$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Product>>> {
    return getAllProducts(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllProducts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProducts(params?: GetAllProducts$Params, context?: HttpContext): Observable<Array<Product>> {
    return this.getAllProducts$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Product>>): Array<Product> => r.body)
    );
  }

  /** Path part for operation `createProduct()` */
  static readonly CreateProductPath = '/products';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createProduct()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProduct$Response(params: CreateProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return createProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createProduct$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProduct(params: CreateProduct$Params, context?: HttpContext): Observable<{
}> {
    return this.createProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getAllSpecifications()` */
  static readonly GetAllSpecificationsPath = '/products/specifications';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllSpecifications()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSpecifications$Response(params?: GetAllSpecifications$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Specification>>> {
    return getAllSpecifications(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllSpecifications$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSpecifications(params?: GetAllSpecifications$Params, context?: HttpContext): Observable<Array<Specification>> {
    return this.getAllSpecifications$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Specification>>): Array<Specification> => r.body)
    );
  }

  /** Path part for operation `getAllProductIds()` */
  static readonly GetAllProductIdsPath = '/products/product-ids';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllProductIds()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProductIds$Response(params?: GetAllProductIds$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<string>>> {
    return getAllProductIds(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllProductIds$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProductIds(params?: GetAllProductIds$Params, context?: HttpContext): Observable<Array<string>> {
    return this.getAllProductIds$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<string>>): Array<string> => r.body)
    );
  }

  /** Path part for operation `deleteSpecification()` */
  static readonly DeleteSpecificationPath = '/products/{id}/specifications/{specification-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSpecification()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSpecification$Response(params: DeleteSpecification$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteSpecification(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteSpecification$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSpecification(params: DeleteSpecification$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteSpecification$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
