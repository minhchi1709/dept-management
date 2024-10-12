import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Customer} from "../../api-services/models/customer";
import {NgForOf, NgIf} from "@angular/common";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {CreateCustomerComponent} from "../create-customer/create-customer.component";
import {ObserverService} from "../../modules/debt-management/services/observer-service/observer.service";
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
export class CustomerListComponent implements AfterViewInit, OnChanges {
  customers: Customer[] = []
  dataSource = new MatTableDataSource<Customer>([])
  invoicesDataSource = new MatTableDataSource<Customer>([])
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

  ngOnChanges(changes: SimpleChanges): void {
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
    this.idQuery = customer.id != undefined ? customer.id : ''
    //this.provinceQuery = customer.province != undefined ? customer.province : ''
    this.filter()
  }

  filter() {
    if (this.idQuery && this.provinceQuery) {
      this.filteredCustomers = this.customers.filter(c => {
        return c.province?.toLowerCase().includes(this.provinceQuery.toLowerCase()) &&
          c.id?.toLowerCase().includes(this.idQuery.toLowerCase())
      })
    } else if (!this.idQuery && this.provinceQuery) { // filter based on province input
      this.filteredCustomers = this.customers.filter(c => {
        return c.province?.toLowerCase().includes(this.provinceQuery.toLowerCase())
      })
    } else if (!this.provinceQuery && this.idQuery){
      this.filteredCustomers = this.customers.filter(c => {
        return c.id?.toLowerCase().includes(this.idQuery.toLowerCase())
      })
    } else {
      this.filteredCustomers = this.customers
    }
    if (this.filteredCustomers.length == 1) {
      this.customer = this.filteredCustomers[0]
      this.invoiceService.getAllInvoicesOfCustomer({
        id: this.customer.id || ''
      }).subscribe({
        next: value => this.invoices = value
      })
    } else {
      this.customer = {}
    }
    this.dataSource = new MatTableDataSource<Customer>(this.filteredCustomers)
    this.ngAfterViewInit()
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
