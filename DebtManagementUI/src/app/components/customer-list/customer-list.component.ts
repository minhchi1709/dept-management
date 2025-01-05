import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Customer} from "../../api-services/models/customer";
import {NgForOf, NgIf} from "@angular/common";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {CreateCustomerComponent} from "../create-customer/create-customer.component";
import {ObserverService} from "../../services/observer-service/observer.service";
import {MatIconModule} from "@angular/material/icon";
import { MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {InvoiceListComponent} from "../invoice-list/invoice-list.component";
import {InvoiceService} from "../../api-services/services/invoice.service";
import {InvoiceRequest} from "../../api-services/models/invoice-request";

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    NgForOf,
    MatTableModule,
    MatPaginatorModule,
    CreateCustomerComponent,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    FormsModule,
    NgIf,
    MatButtonModule,
    InvoiceListComponent
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements AfterViewInit, OnChanges, OnInit {
  customers: Customer[] = []
  dataSource = new MatTableDataSource<Customer>([])
  columnsToDisplay = ['id', 'name', 'telephone', 'province'];
  filteredCustomers: Customer[] = []
  idQuery: string = ''
  provinceQuery: string = ''
  customer: Customer = {}
  invoices: InvoiceRequest[] = []

  constructor(
    private observer: ObserverService,
    private invoiceService: InvoiceService
  ) {
  }

  ngOnInit(): void {

    this.observer.object$.subscribe(object => {
      if (object && object.type == 'customer' && object.reload) {
        this.idQuery = ''
      }
    })

    this.filter()
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.ngOnInit()
      this.ngAfterViewInit()
    }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  @Input()
  set input(input: Customer[]) {
    this.customers = input
    this.filteredCustomers = input
    this.dataSource = new MatTableDataSource<Customer>(this.customers)
  }

  setCustomer(customer: Customer) {
    this.observer.notify({
      object: {...customer},
      title: 'Chỉnh sửa khách hàng',
      editMode: true
    })
    this.idQuery = customer.customerId || ''

    this.filter()
  }

  filter() {
    this.filteredCustomers = this.customers
    this.filterByCustomerId()
    this.filterByProvince()
    if (this.filteredCustomers.length == 1) {
      this.customer = this.filteredCustomers[0]
      this.invoiceService.getAllInvoicesOfCustomer({
        id: this.customer.customerId || ''
      }).subscribe({
        next: value => this.invoices = value
      })
    } else {
      this.customer = {}
    }
    this.dataSource = new MatTableDataSource<Customer>(this.filteredCustomers)
    this.ngAfterViewInit()
  }

  filterByCustomerId() {
    if (this.idQuery) {
      this.filteredCustomers = this.filteredCustomers.filter(c => {
        return c.customerId?.toLowerCase().includes(this.idQuery.toLowerCase())
      })
    }
  }

  filterByProvince() {
    if (this.provinceQuery) {
      this.filteredCustomers = this.filteredCustomers.filter(c => {
        return c.province?.toLowerCase().includes(this.provinceQuery.toLowerCase())
      })
    }
  }

  clear(type: string) {
    if (type === 'id') {
      this.idQuery = ''
    } else if (type === 'province') {
      this.provinceQuery = ''
    }
    this.filter()
  }
}
