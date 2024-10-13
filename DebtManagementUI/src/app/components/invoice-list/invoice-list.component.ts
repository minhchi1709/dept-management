import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {Invoice} from "../../api-services/models/invoice";
import {DateService} from "../../modules/debt-management/services/date-service/date.service";
import {CurrencyService} from "../../modules/debt-management/services/currency-service/currency.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {InvoiceDetailComponent} from "../invoice-detail/invoice-detail.component";
import {InvoiceLineRequest} from "../../api-services/models/invoice-line-request";
import {MapperService} from "../../modules/debt-management/services/mapper-service/mapper.service";
import {GraphComponent} from "../graph/graph.component";
import {InvoiceResponse} from "../../api-services/models/invoice-response";

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [
    NgForOf,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    MatDatepickerModule,
    MatDatepicker,
    ReactiveFormsModule,
    NgIf,
    InvoiceDetailComponent,
    GraphComponent,
    NgStyle
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss'
})
export class InvoiceListComponent implements AfterViewInit, OnChanges, OnInit {

  invoice: InvoiceResponse = {}
  invoices: InvoiceResponse[] = []
  filteredInvoices: InvoiceResponse[] = []
  dataSource = new MatTableDataSource<InvoiceResponse>([])
  invoiceLineDataSource = new MatTableDataSource<InvoiceLineRequest>([])
  columnsToDisplay = [
    'invoiceId',
    'customerId',
    'province',
    'date',
    'total'
  ];
  invoiceIdQuery: string = '';
  customerIdQuery: string = '';
  provinceQuery: string = '';
  date: any = ''
  month: any = ''
  year: any = ''
  graphTitle: string = ''
  datapoints: any[] =[]
  showGraph: boolean = false


  constructor(
    protected dateService: DateService,
    protected currencyService: CurrencyService,
    private mapper: MapperService
  ) {
  }

  ngOnInit(): void {
        this.filter()
    }

  ngOnChanges(changes: SimpleChanges): void {
        this.ngOnInit()
        this.ngAfterViewInit()
    }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.filter()
  }

  @Input()
  set input(input: InvoiceResponse[]) {
    this.invoices = input
    this.filteredInvoices = input
    this.dataSource = new MatTableDataSource<InvoiceResponse>(input)
  }

  setInvoice(dataSource: Invoice) {
    /*this.observer.notify({
      object: {...dataSource},
      title: 'Chỉnh sửa đơn hàng',
      editMode: true
    })*/
    this.invoiceIdQuery = dataSource.id ? dataSource.id : ''
    this.filter()
  }

  filter() {

    this.showGraph = false
    this.filteredInvoices = this.invoices
    this.graphTitle = ''
    this.filterByInvoiceId()
    this.filterByCustomerId()
    this.filterByProvince()
    this.filterByDate()
    if (this.filteredInvoices.length == 1) {
      this.invoice = this.filteredInvoices[0]
      this.invoiceLineDataSource = new MatTableDataSource<InvoiceLineRequest>(
        this.invoice.invoiceLines?.map(line => {
          return this.mapper.mapToInvoiceLineRequest(line)
        })
      )
    }
    if (this.filteredInvoices.length > 1) {
      if (this.year) {
        this.showGraph = true
        if (this.month) {
          if (this.date) {
            console.log('date')
            this.graphTitle = `Thống kê ngày ${this.date}/${this.month}/${this.year}`
          } else {
            console.log('month')
            this.graphTitle = `Thống kê tháng ${this.month}/${this.year}`
          }
        } else {
          console.log('year')
          this.graphTitle = `Thống kê năm ${this.year}`
        }
        if (this.onlyOneCustomer()) {
          const customer = this.filteredInvoices[0].customer
          this.graphTitle += ` của khách hàng ${customer?.name}, MKH: ${customer?.customerId}`
        }
      } else if (this.onlyOneCustomer()) {
        this.showGraph = true
        const customer = this.filteredInvoices[0].customer
        this.graphTitle += `Thống kê của khách hàng ${customer?.name}, MKH: ${customer?.customerId}`
      }

      if (this.showGraph) {
        this.datapoints = this.filteredInvoices.map(invoice => {
          return {
            label: this.dateService.formatDate(invoice.date || ''),
            y: invoice.total
          }
        })
      }
    }
    this.dataSource = new MatTableDataSource<InvoiceResponse>(this.filteredInvoices)
  }

  onlyOneCustomer(): boolean {
    const id = this.filteredInvoices[0].customer?.id
    for (let i = 1; i < this.filteredInvoices.length ; i++) {
      if (this.filteredInvoices[i].customer?.id !== id) {
        return false
      }
    }
    return true
  }

  filterByInvoiceId() {
    if (this.invoiceIdQuery) {
      console.log('filter invoice id')
      this.filteredInvoices = this.filteredInvoices.filter(invoice => {
        return invoice.id?.toLowerCase().includes(this.invoiceIdQuery.toLowerCase())
      })
    }
  }

  filterByCustomerId() {
    if (this.customerIdQuery) {
      console.log('filter customer id')
      this.filteredInvoices = this.filteredInvoices.filter(invoice => {
        return invoice.customer?.customerId?.toLowerCase().includes(this.customerIdQuery.toLowerCase())
      })
    }
  }

  filterByProvince() {
    if (this.provinceQuery) {
      console.log('filter province')
      this.filteredInvoices = this.filteredInvoices.filter(invoice => {
        return invoice.customer?.province?.toLowerCase().includes(this.provinceQuery.toLowerCase())
      })
    }
  }

  filterByDate() {
    if (this.year) {
      if (this.month) {
        console.log('filter month')
        if (this.date) {
          this.filteredInvoices = this.filteredInvoices.filter(invoice => {
            const date = new Date(invoice.date || '')
            return date.getDate() == Number(this.date) &&
              date.getMonth() + 1 == Number(this.month) && date.getFullYear() == Number(this.year)
          })
        } else { // only month and year
          this.filteredInvoices = this.filteredInvoices.filter(invoice => {
            const date = new Date(invoice.date || '')
            return date.getMonth() + 1 == Number(this.month) && date.getFullYear() == Number(this.year)
          })
        }
      } else { // only year
        this.filteredInvoices = this.filteredInvoices.filter(invoice => {
          const date = new Date(invoice.date || '')
          return date.getFullYear() == Number(this.year)
        })
      }
    }
  }

  clear(type: string) {
    switch (type) {
      case 'invoiceId': {
        this.invoiceIdQuery = ''
        break
      }
      case 'customerId': {
        this.customerIdQuery = ''
        break
      }
      case 'province': {
        this.provinceQuery = ''
        break
      }
      case 'date': {
        this.date = ''
        break
      }
      case 'month': {
        this.month = ''
        break
      }
      case 'year': {
        this.year = ''
        break
      }
    }
    this.filter()
  }
}
