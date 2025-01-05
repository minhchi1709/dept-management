import { Component } from '@angular/core';
import {AuthenticationRequest} from "../../api-services/models/authentication-request";
import {AuthenticationService} from "../../api-services/services/authentication.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {TokenService} from "../../services/token-service/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  request: AuthenticationRequest = {id: '', password: ''}

  constructor (
    private service: AuthenticationService,
    private router: Router
  ) {

  }

  login() {
    if (!this.request.id || !this.request.password) {
      return
    }
    this.service.login({
      body: this.request
    }).subscribe({
      next: val => {
        TokenService.saveToken(val.token || '')
        this.router.navigate([''])
      },
      error: err => alert('Thông tin đăng nhập không đúng')
    })
  }
}
