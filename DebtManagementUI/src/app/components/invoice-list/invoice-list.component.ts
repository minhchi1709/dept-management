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
import {DateService} from "../../services/date-service/date.service";
import {CurrencyService} from "../../services/currency-service/currency.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {InvoiceDetailComponent} from "../invoice-detail/invoice-detail.component";
import {InvoiceLineRequest} from "../../api-services/models/invoice-line-request";
import {MapperService} from "../../services/mapper-service/mapper.service";
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

  graphTitle: string = ''
  datapoints: any[] =[]
  showGraph: boolean = false
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


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
      if (this.onlyOneCustomer()) {
        this.showGraph = true
        const customer = this.filteredInvoices[0].customer
        this.graphTitle = this.graphTitle ?
          `${this.graphTitle} của khách hàng ${customer?.name}, MKH: ${customer?.customerId}` :
          `Thống kê của khách hàng ${customer?.name}, MKH: ${customer?.customerId}`
      }

      if (this.showGraph) {
        this.datapoints = this.filteredInvoices.map(invoice => {
          return {
            label: this.dateService.formatDate(invoice.date || ''),
            y: invoice.total
          }
        })
      }
    } else {
      this.showGraph = false
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
    this.filterByStartDate()
    this.filterByEndDate()
  }

  filterByStartDate() {
    if (this.range.value.start) {
      this.showGraph = true

      const start = new Date(this.range.value.start.toISOString())
      this.graphTitle = `Thống kê từ ${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()}`
      this.filteredInvoices = this.filteredInvoices.filter(invoice => {
        const date = new Date(invoice.date || '')
        return start <= date
      })
    }
  }

  filterByEndDate() {
    if (this.range.value.end) {
      this.showGraph = true
      const end = new Date(this.range.value.end.toISOString())
      end.setHours(23, 59, 59)
      this.graphTitle = this.graphTitle ?
        `${this.graphTitle} đến ${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}` :
        `Thống kê đến ${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()} `
      this.filteredInvoices = this.filteredInvoices.filter(invoice => {
        const date = new Date(invoice.date || '')
        return end >= date
      })
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
        this.range.reset()
        break
      }

    }
    this.filter()
  }
}
