import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-messages-inbox',
  templateUrl: './messages-inbox.component.html',
  styleUrl: './messages-inbox.component.css'
})
export class MessagesInboxComponent {
  @Input() GroupedMessages: any[] = [];
}
