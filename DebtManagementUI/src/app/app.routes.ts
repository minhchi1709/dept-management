import { Routes } from '@angular/router';
import {MainComponent} from "./modules/main/components/main/main.component";
import {LoginComponent} from "./auth/login/login.component";
import {authGuard} from "./services/auth-guard/auth.guard";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/login',
  }
];
