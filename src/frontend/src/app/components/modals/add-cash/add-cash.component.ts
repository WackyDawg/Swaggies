import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Copy } from 'lucide-angular';

@Component({
  selector: 'app-add-cash',
  templateUrl: './add-cash.component.html',
  styleUrl: './add-cash.component.css',
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
      state(
        'out',
        style({
          transform: 'translateY(100%)',
          opacity: 0,
        })
      ),
      transition('in => out', [animate('0.3s ease-in-out')]),
      transition('out => in', [animate('0.3s ease-in-out')]),
    ]),
    trigger('fadeInOut', [
      state(
        'in',
        style({
          opacity: 1,
        })
      ),
      state(
        'out',
        style({
          opacity: 0,
        })
      ),
      transition('in => out', [animate('0.5s ease-in-out')]),
      transition('out => in', [animate('0.5s ease-in-out')]),
    ]),
  ],
})
export class AddCashComponent {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  icons = { Copy };
  accountNumber1: string = '0123456789';
  accountNumber2: string = '9876543210';
  copiedMessage: string = '';

  copyToClipboard(accountNumber: string) {
    navigator.clipboard.writeText(accountNumber).then(() => {
      this.copiedMessage = 'Copied!';
      setTimeout(() => this.copiedMessage = '', 2000);
    }).catch(err => {
      console.error('Failed to copy text:', err);
    });
  }


  close() {
    this.isOpen = false;
    this.closeModal.emit();
  }
}
