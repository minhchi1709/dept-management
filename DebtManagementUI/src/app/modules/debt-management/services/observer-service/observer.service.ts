import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ObserverService {
  private objectCreationSource = new BehaviorSubject<any>(null);
  objectCreated$ = this.objectCreationSource.asObservable();
  private objectSource = new BehaviorSubject<any>(null);
  object$ = this.objectSource.asObservable()
  private resetSource = new BehaviorSubject<any>(null);
  reset$ = this.resetSource.asObservable()
  private deleteSource = new BehaviorSubject<any>(null);
  delete$ = this.deleteSource.asObservable()

  constructor(

  ) { }

  creationNotify(newObject: any) {
    this.objectCreationSource.next(newObject);
  }

  notify(object: any) {
    this.objectSource.next(object)
  }

  resetNotify(object: any) {
    this.resetSource.next(object)
  }

  deleteNotify(object: any) {
    this.deleteSource.next(object)
  }
}
