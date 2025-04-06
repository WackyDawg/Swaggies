import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalStates: Map<string, BehaviorSubject<boolean>> = new Map();

  /**
   * Get the observable for a specific modal
   * @param modalId - Unique identifier for the modal
   */
  getModalState(modalId: string): Observable<boolean> {
    if (!this.modalStates.has(modalId)) {
      this.modalStates.set(modalId, new BehaviorSubject<boolean>(false));
    }
    return this.modalStates.get(modalId)!.asObservable();
  }

  /**
   * Open a specific modal
   * @param modalId - Unique identifier for the modal
   */
  openModal(modalId: string): void {
    console.log(`Opening modal: ${modalId}`);
    if (!this.modalStates.has(modalId)) {
      this.modalStates.set(modalId, new BehaviorSubject<boolean>(true));
    } else {
      this.modalStates.get(modalId)!.next(true);
    }
  }

  /**
   * Close a specific modal
   * @param modalId - Unique identifier for the modal
   */
  closeModal(modalId: string): void {
    console.log(`Closing modal: ${modalId}`);
    if (this.modalStates.has(modalId)) {
      this.modalStates.get(modalId)!.next(false);
    }
  }
}
