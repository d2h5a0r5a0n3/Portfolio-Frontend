import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ContactForm, ContactService } from '../../service/contact-service/contact.service';
import { MatIconModule } from '@angular/material/icon';
import { SharedCardComponent } from '../../shared/shared-card/shared-card.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, MatIconModule, SharedCardComponent, MatTooltipModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages$: Observable<ContactForm[]> | undefined;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.messages$ = this.contactService.getMessages();
  }

  onMessageOpened(message: ContactForm): void {
    if (message.id && !message.read) {
      this.contactService.markAsRead(message.id);
    }
  }

  toggleReadStatus(event: Event, message: ContactForm): void {
    event.stopPropagation(); // Prevent accordion from expanding/collapsing
    if (message.id) {
      if (message.read) {
        this.contactService.markAsUnread(message.id);
      } else {
        this.contactService.markAsRead(message.id);
      }
    }
  }

  deleteMessage(event: Event, message: ContactForm): void {
    event.stopPropagation();
    if (message.id && confirm('Are you sure you want to delete this message?')) {
      this.contactService.deleteMessage(message.id);
    }
  }
}
