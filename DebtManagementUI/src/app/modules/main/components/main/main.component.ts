import {Component, OnInit} from '@angular/core';
import {InvoiceListComponent} from "../../../../components/invoice-list/invoice-list.component";
import {CustomerListComponent} from "../../../../components/customer-list/customer-list.component";
import {ProductListComponent} from "../../../../components/product-list/product-list.component";
import {NgIf} from "@angular/common";
import {InvoiceService} from "../../../../api-services/services/invoice.service";
import {CustomerService} from "../../../../api-services/services/customer.service";
import {ProductService} from "../../../../api-services/services/product.service";
import {Customer} from "../../../../api-services/models/customer";
import {Product} from "../../../../api-services/models/product";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {ObserverService} from "../../../../services/observer-service/observer.service";
import {MatTabChangeEvent, MatTabsModule} from "@angular/material/tabs";
import {InvoiceResponse} from "../../../../api-services/models/invoice-response";
import {DeleteConfirmationComponent} from "../../../../components/delete-confirmation/delete-confirmation.component";
import {NavigationComponent} from "../../../../components/navigation/navigation.component";
import {RouterOutlet} from "@angular/router";
import {CreateCustomerComponent} from "../../../../components/create-customer/create-customer.component";
import {CreateInvoiceComponent} from "../../../../components/create-invoice/create-invoice.component";
import {CreateProductComponent} from "../../../../components/create-product/create-product.component";
import {AccountManagementComponent} from "../account-management/account-management.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    InvoiceListComponent,
    CustomerListComponent,
    ProductListComponent,
    NgIf,
    NgbTooltip,
    MatTabsModule,
    DeleteConfirmationComponent,
    NavigationComponent,
    RouterOutlet,
    CreateCustomerComponent,
    CreateInvoiceComponent,
    CreateProductComponent,
    AccountManagementComponent
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
    this.observer.object$.subscribe(newObject => {
      if (newObject && newObject.reload) {
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
