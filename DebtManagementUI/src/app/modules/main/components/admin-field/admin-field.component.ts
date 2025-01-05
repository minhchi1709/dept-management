import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../api-services/services/authentication.service";
import {RegistrationRequest} from "../../../../api-services/models/registration-request";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDivider} from "@angular/material/divider";
import {UserListComponent} from "../user-list/user-list.component";
import {User} from "../../../../api-services/models/user";
import {UserService} from "../../../../api-services/services/user.service";

@Component({
  selector: 'app-admin-field',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatGridListModule,
    MatDivider,
    UserListComponent
  ],
  templateUrl: './admin-field.component.html',
  styleUrl: './admin-field.component.scss'
})
export class AdminFieldComponent implements OnInit {

  isAdmin: boolean = false
  request: RegistrationRequest = {id: '', name: '', password: ''}
  userId: string = ''
  newPassword: string = ''
  users: User[] = []

  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.authService.isAdmin().subscribe({
      next: val => {
        this.isAdmin = val.response || false
      }
    })

    this.userService.getAllUsers().subscribe({
      next: val => {
        this.users = val
        console.log(val)
      }
    })
  }

  registerUser() {
    if (!this.request.id || !this.request.name || !this.request.password) {
      return
    }

    this.authService.register({
      body: this.request
    }).subscribe({
      next: val => {
        this.reset(true)
        this.ngOnInit()
      },
      error: err => {
        console.log(err)
        alert(`Tên đăng nhập ${this.request.id} đã tồn tại`)
      }
    })
  }

  setNewPassword() {
    if (!this.userId || !this.newPassword) {
      return
    }

    this.authService.setNewPassword({
      userId: this.userId,
      newPassword: this.newPassword
    }).subscribe({
      next: () => {
        this.reset(false)
      }
    })
  }

  reset(register: boolean) {
    if (register) {
      this.request.id = ''
      this.request.name = ''
      this.request.password = ''
    } else {
      this.userId = ''
      this.newPassword = ''
    }
  }

  deleteUser($event: string) {
    console.log($event)
    this.authService.deleteUser({
      userId: $event
    }).subscribe({
      next: () => {
        this.ngOnInit()
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
