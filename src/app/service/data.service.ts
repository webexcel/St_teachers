import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private menustatus = new BehaviorSubject(false);
  currentMenustatus = this.menustatus.asObservable();

  constructor() { }

  changeMenustatus(message: boolean) {
    this.menustatus.next(message)
  }
}
