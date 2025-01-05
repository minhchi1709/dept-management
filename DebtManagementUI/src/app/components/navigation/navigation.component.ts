import {Component, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {ObserverService} from "../../services/observer-service/observer.service";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {TokenService} from "../../services/token-service/token.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../api-services/services/authentication.service";
import {UserResponse} from "../../api-services/models/user-response";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    NgForOf,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    NgOptimizedImage,

  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit{
  user: UserResponse = {id: '', name: ''}

  constructor(
    private observer: ObserverService,
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
      this.authService.getCurrentUser().subscribe({
        next: val => this.user = val
      })
    }

  reset(mode: string) {
    this.observer.resetNotify({
      mode: mode
    })
  }


  logout() {
    TokenService.deleteToken()
    this.router.navigate(['/login'])
  }
}
