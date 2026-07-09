import { inject, Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc, deleteDoc, query, orderBy } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface ContactForm {
  id?: string;
  name: string;
  mail: string;
  subject: string;
  message: string;
  timestamp?: any;
  read?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private fireStore: Firestore = inject(Firestore);
  private contactsCollection = collection(this.fireStore, 'contacts');

  sendMessage(form: ContactForm): Observable<any> {
    return from(addDoc(this.contactsCollection, {
        ...form,
        timestamp: new Date(),
        read: false
    }));
  }

  getMessages(): Observable<ContactForm[]> {
    const messagesQuery = query(this.contactsCollection, orderBy('timestamp', 'desc'));
    return (collectionData(messagesQuery, { idField: 'id' }) as Observable<any[]>).pipe(
      map(messages => messages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp?.toDate ? msg.timestamp.toDate() : msg.timestamp
      })))
    ) as Observable<ContactForm[]>;
  }

  async markAsRead(id: string): Promise<void> {
    const messageDoc = doc(this.fireStore, `contacts/${id}`);
    await updateDoc(messageDoc, { read: true });
  }

  async markAsUnread(id: string): Promise<void> {
    const messageDoc = doc(this.fireStore, `contacts/${id}`);
    await updateDoc(messageDoc, { read: false });
  }

  async deleteMessage(id: string): Promise<void> {
    const messageDoc = doc(this.fireStore, `contacts/${id}`);
    await deleteDoc(messageDoc);
  }
}
