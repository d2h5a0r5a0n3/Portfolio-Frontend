import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactForm, ContactService } from '../../service/contact-service/contact.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  form: ContactForm = {
    name: '',
    mail: '',
    message: '',
    subject: ''
  };
  success = false;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private contactService: ContactService) { }

  sendMessage() {
    this.contactService.sendMessage(this.form).subscribe({
      next: (res) => {
        console.log('✅ Mail Response:', res); // Add this
        this.snackBar.open('Message sent successfully!', 'Close', { duration: 3000 });
        this.success = true;
        this.form = { name: '', mail: '', subject: '', message: '' };
      },
      error: (err) => {
        console.error('❌ Mail send error:', err);  // Add this
        this.snackBar.open('Failed to send message.', 'Close', { duration: 3000 });
      }
    });
  }
}
