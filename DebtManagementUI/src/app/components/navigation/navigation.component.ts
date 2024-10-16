import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {InvoiceService} from "../../api-services/services/invoice.service";
import {CreateCustomerComponent} from "../create-customer/create-customer.component";
import {CreateInvoiceComponent} from "../create-invoice/create-invoice.component";
import {CreateProductComponent} from "../create-product/create-product.component";
import {ObserverService} from "../../services/observer-service/observer.service";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    NgForOf,
    CreateCustomerComponent,
    CreateInvoiceComponent,
    CreateProductComponent,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit{
  years: number[] = []

  constructor(
    private invoiceService: InvoiceService,
    private observer: ObserverService
  ) {
  }

  ngOnInit(): void {

  }

  reset(mode: string) {
    this.observer.resetNotify({
      mode: mode
    })
  }


}
