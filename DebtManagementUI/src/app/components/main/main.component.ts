import { Component } from '@angular/core';
import {CreateProductComponent} from "../create-product/create-product.component";
import {CreateCustomerComponent} from "../create-customer/create-customer.component";
import {CreateInvoiceComponent} from "../create-invoice/create-invoice.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CreateProductComponent,
    CreateCustomerComponent,
    CreateInvoiceComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
