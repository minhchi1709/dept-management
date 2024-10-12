import {Component, OnInit} from '@angular/core';
import {ObserverService} from "../../modules/debt-management/services/observer-service/observer.service";
import {CustomerService} from "../../api-services/services/customer.service";
import {ProductService} from "../../api-services/services/product.service";
import {InvoiceService} from "../../api-services/services/invoice.service";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [
    MatIcon,
    MatMiniFabButton,
    MatTooltip
  ],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.scss'
})
export class DeleteConfirmationComponent implements OnInit{
  type: string = ''
  id: string = ''

  constructor(
    private observer: ObserverService,
    private customerService: CustomerService,
    private productService: ProductService,
    private invoiceService: InvoiceService
  ) {
  }

  ngOnInit(): void {
    this.observer.delete$.subscribe(object => {
      if (object) {
        this.type = object.type
        this.id = object.id
      }
    })
  }

  delete() {
    switch (this.type) {
      case 'customer': {
        this.customerService.deleteCustomer({
          id: this.id
        }).subscribe({
          next: value => {
            this.observer.creationNotify(true)
          },
          error: err => console.log(err)
        })
        break
      }
      case 'product': {
        this.productService.deleteProduct({
          id: this.id
        }).subscribe({
          next: value => {
            this.observer.creationNotify(true)
          },
          error: err => console.log(err)
        })
        break
      }
      case 'invoice': {
        this.invoiceService.deleteInvoice({
          id: this.id
        }).subscribe({
          next: value => {
            this.observer.creationNotify(true)
          },
          error: err => console.log(err)
        })
        break
      }
    }
  }
}
