import {Component, OnInit} from '@angular/core';
import {AdminFieldComponent} from "../admin-field/admin-field.component";
import {UserFieldComponent} from "../user-field/user-field.component";
import {AuthenticationService} from "../../../../api-services/services/authentication.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [
    AdminFieldComponent,
    UserFieldComponent,
    NgIf
  ],
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.scss'
})
export class AccountManagementComponent implements OnInit {
  isAdmin: boolean = false

  constructor(
    private authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.authService.isAdmin().subscribe({
      next: val => {
        this.isAdmin = val.response || false
      }
    })
  }
}
