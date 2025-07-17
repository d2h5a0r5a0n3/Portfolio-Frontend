import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ContactForm {
  name: string,
  mail: string,
  subject: string,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:9091/api/contact/send';

  constructor(private http: HttpClient) { }

  sendMessage(form: ContactForm): Observable<any> {
    return this.http.post(this.apiUrl, form);
  }
}
