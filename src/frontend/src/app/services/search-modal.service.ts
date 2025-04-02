import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  isModalOpen$: Observable<boolean> = this.modalStateSubject.asObservable();

  openModal(): void {
    console.log('Opening modal via service');
    this.modalStateSubject.next(true);
  }

  closeModal(): void {
    console.log('Closing modal via service');
    this.modalStateSubject.next(false);
  }
}
