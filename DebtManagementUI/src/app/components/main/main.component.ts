import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {InvoiceListComponent} from "../invoice-list/invoice-list.component";
import {CustomerListComponent} from "../customer-list/customer-list.component";
import {ProductListComponent} from "../product-list/product-list.component";
import {NgIf} from "@angular/common";
import {InvoiceService} from "../../api-services/services/invoice.service";
import {CustomerService} from "../../api-services/services/customer.service";
import {ProductService} from "../../api-services/services/product.service";
import {Invoice} from "../../api-services/models/invoice";
import {Customer} from "../../api-services/models/customer";
import {Product} from "../../api-services/models/product";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {ObserverService} from "../../modules/debt-management/services/observer-service/observer.service";
import {MatTabsModule} from "@angular/material/tabs";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    InvoiceListComponent,
    CustomerListComponent,
    ProductListComponent,
    NgIf,
    NgbTooltip,
    MatTabsModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnChanges {

  invoices: Invoice[] = []
  customers: Customer[] = []
  products: Product[] = []

  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private productService: ProductService,
    private observer: ObserverService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {

    }

  ngOnInit(): void {
    this.initialize()
    this.observer.objectCreated$.subscribe(newObject => {
      if (newObject) {
        this.initialize()
      }
    })
  }

  initialize() {
    this.invoiceService.getAllInvoices().subscribe({
      next: value => {
        this.invoices = value
      }
    })
    this.customerService.getAllCustomers().subscribe({
      next: val => this.customers = val
    })
    this.productService.getAllProducts().subscribe({
      next: val => this.products = val
    })
  }
}