import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ObserverService {
  private objectSource = new BehaviorSubject<any>(null);
  object$ = this.objectSource.asObservable()
  private resetSource = new BehaviorSubject<any>(null);
  reset$ = this.resetSource.asObservable()

  constructor(

  ) { }

  notify(object: any) {
    this.objectSource.next(object)
  }

  resetNotify(object: any) {
    this.resetSource.next(object)
  }

}
