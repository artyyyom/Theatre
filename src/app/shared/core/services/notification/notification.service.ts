import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/publish';


@Injectable()
export class NotificationService {

  private _notification: BehaviorSubject<any> = new BehaviorSubject({message: "", type: ""});
  readonly notification$: Observable<any> = this._notification.asObservable().publish().refCount();

  constructor() {}

  notify(message, type = "success") {
    this._notification.next({message : message, type: type});
    setTimeout(() => this._notification.next({message: null, type: null}), 7000);
  }

}
