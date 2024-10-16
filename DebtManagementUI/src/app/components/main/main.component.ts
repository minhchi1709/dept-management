import {Component, OnInit} from '@angular/core';
import {InvoiceListComponent} from "../invoice-list/invoice-list.component";
import {CustomerListComponent} from "../customer-list/customer-list.component";
import {ProductListComponent} from "../product-list/product-list.component";
import {NgIf} from "@angular/common";
import {InvoiceService} from "../../api-services/services/invoice.service";
import {CustomerService} from "../../api-services/services/customer.service";
import {ProductService} from "../../api-services/services/product.service";
import {Customer} from "../../api-services/models/customer";
import {Product} from "../../api-services/models/product";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {ObserverService} from "../../services/observer-service/observer.service";
import {MatTabChangeEvent, MatTabsModule} from "@angular/material/tabs";
import {InvoiceResponse} from "../../api-services/models/invoice-response";

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
export class MainComponent implements OnInit {

  invoices: InvoiceResponse[] = []
  customers: Customer[] = []
  products: Product[] = []
  renderCustomerList: boolean = false

  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private productService: ProductService,
    private observer: ObserverService
  ) {
  }

  ngOnInit(): void {
    this.initialize()
    this.observer.objectCreated$.subscribe(newObject => {
      if (newObject) {
        this.initialize()
      }
    })

    this.observer.objectUpdated$.subscribe(object => {
      if (object) {
        console.log('main')
        this.renderCustomerList = true
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

  onTabChange($event: MatTabChangeEvent) {
    if ($event.index == 1) {
      this.renderCustomerList = true
    }
  }
}
