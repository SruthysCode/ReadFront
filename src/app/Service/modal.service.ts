import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _isVisible = new BehaviorSubject<boolean>(false);

  get isVisible() {
    return this._isVisible.asObservable();
  }

  show() {
    this._isVisible.next(true);
    setTimeout(() => this.hide(), 3000); // Hide after 3 seconds
  }

  hide() {
    this._isVisible.next(false);
  }
}
