import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  formatDate(date: string): string {
    return date.split('-').reverse().join('/')
  }
}
