import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Product} from "../../api-services/models/product";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {ObserverService} from "../../modules/debt-management/services/observer-service/observer.service";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {Specification} from "../../api-services/models/specification";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements AfterViewInit, OnChanges {

  products: Product[] = []
  dataSource = new MatTableDataSource<Product>([])
  columnsToDisplay = ['id', 'name', 'specification'];
  columnsToDisplaySpec = ['price', 'unit', 'amountPerBox']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  idQuery: string = '';
  filteredProducts: Product[] = []
  product: Product = {}
  dataSourceSpecifications = new MatTableDataSource<Specification>([])

  constructor(
    private observer: ObserverService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngAfterViewInit()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  @Input()
  set productList(input: Product[]) {
    this.products = input
    this.filteredProducts = input
    this.dataSource = new MatTableDataSource<Product>(input)
  }

  setProduct(dataSource: Product) {
    this.observer.notify({
      object: {...dataSource},
      title: 'Chỉnh sửa sản phẩm',
      editMode: true
    })
    this.idQuery = dataSource.id != undefined ? dataSource.id : ''
    this.filter()
  }

  filter() {
    if (!this.idQuery) {
      this.filteredProducts = this.products
    } else {
      this.filteredProducts = this.products.filter((p, i, a) => {
        return p.id?.toLowerCase().includes(this.idQuery.toLowerCase())
      })
    }
    if (this.filteredProducts.length == 1) {
      this.product = this.filteredProducts[0]
      if (this.product.specifications) {
        this.dataSourceSpecifications = new MatTableDataSource<Specification>(this.product.specifications)
      }
    }
    this.dataSource = new MatTableDataSource<Product>(this.filteredProducts)
  }

  clear() {
    this.idQuery = ''
    this.filter()
  }
}
