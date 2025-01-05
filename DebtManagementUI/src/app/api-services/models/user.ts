/* tslint:disable */
/* eslint-disable */
import { GrantedAuthority } from '../models/granted-authority';
export interface User {
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authorities?: Array<GrantedAuthority>;
  credentialsNonExpired?: boolean;
  enabled?: boolean;
  id?: string;
  name?: string;
  password?: string;
  role?: 'ADMIN' | 'NORMAL_USER';
  username?: string;
}
