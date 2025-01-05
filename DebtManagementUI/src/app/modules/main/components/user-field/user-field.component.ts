import { Component } from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "../../../../api-services/services/authentication.service";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-user-field',
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-field.component.html',
  styleUrl: './user-field.component.scss'
})
export class UserFieldComponent {

  oldPassword: string = ''
  newPassword: string = ''

  constructor(
    private authService: AuthenticationService
  ) {
  }

  reset() {
    this.newPassword = ''
    this.oldPassword = ''
  }

  changePassword() {
    if (!this.oldPassword || !this.newPassword) {
      return
    }
    this.authService.changePassword({
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    }).subscribe( {
      next: () => {

      },
      error: err => {
        console.log(err)
        alert('Mật khẩu cũ không trùng khớp')
      }
    })
  }
}
