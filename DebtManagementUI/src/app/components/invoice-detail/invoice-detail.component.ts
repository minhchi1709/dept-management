import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {InvoiceLineRequest} from "../../api-services/models/invoice-line-request";
import {ProductService} from "../../api-services/services/product.service";
import {Product} from "../../api-services/models/product";
import {Specification} from "../../api-services/models/specification";
import {DateService} from "../../modules/debt-management/services/date-service/date.service";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {ObserverService} from "../../modules/debt-management/services/observer-service/observer.service";
import {InvoiceResponse} from "../../api-services/models/invoice-response";

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    MatButtonModule,
    MatIconModule,
    MatTooltip
  ],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.scss'
})
export class InvoiceDetailComponent implements OnInit, OnChanges {

  dataSource = new MatTableDataSource<InvoiceLineRequest>([]);
  columnsToDisplay = ['productId', 'productName', 'specification', 'numOfBoxes', 'note'];
  products: Product[] = []
  specifications: Specification[] = []
  invoice: InvoiceResponse = {}

  constructor(
    private productService: ProductService,
    protected dateService: DateService,
    private observer: ObserverService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {

    }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: val => this.products = val
    })

    this.productService.getAllSpecifications().subscribe({
      next: val => this.specifications = val
    })
  }

  getSpecification(id: number): Specification {
    for (let specification of this.specifications) {
      if (specification.id == id) {
        return specification
      }
    }
    return {}
  }

  getProductName(id: string): string {
    for (let product of this.products) {
      if (product.productId == id) {
        return product.name? product.name : ''
      }
    }
    return ''
  }

  @Input()
  set setDataSource(dataSource: any) {
    this.dataSource = dataSource
  }

  @Input()
  set setInvoice(invoice: InvoiceResponse) {
    this.invoice = invoice
  }

  deleteInvoice() {
    this.observer.deleteNotify({
      type: 'invoice',
      id: this.invoice.id
    })
  }
}
