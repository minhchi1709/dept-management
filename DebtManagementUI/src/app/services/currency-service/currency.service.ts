import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() { }

  public numberWithCommas(x: number):string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
