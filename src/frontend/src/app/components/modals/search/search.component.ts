import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      state('out', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      transition('in => out', [
        animate('0.3s ease-in-out')
      ]),
      transition('out => in', [
        animate('0.3s ease-in-out')
      ]),
    ]),
    trigger('fadeInOut', [
      state('in', style({
        opacity: 1
      })),
      state('out', style({
        opacity: 0
      })),
      transition('in => out', [
        animate('0.5s ease-in-out')
      ]),
      transition('out => in', [
        animate('0.5s ease-in-out')
      ]),
    ])
  ]
})
export class SEARCHComponent {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.isOpen = false;
    this.closeModal.emit();  
  }
}
