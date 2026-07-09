import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Education } from '../../educations/education';
import { Firestore, collectionData, docData, addDoc, collection, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class EducationService {
  private fireStore: Firestore = inject(Firestore);
  private educationCollection = collection(this.fireStore, 'educations');

  getEducations(): Observable<Education[]> {
    return (collectionData(this.educationCollection, { idField: 'id' }) as Observable<any[]>).pipe(
      map(educations => educations.map(edu => ({
        ...edu,
        startDate: edu.startDate?.toDate ? edu.startDate.toDate() : edu.startDate,
        endDate: edu.endDate?.toDate ? edu.endDate.toDate() : edu.endDate
      })))
    ) as Observable<Education[]>;
  }

  getEducationById(id: string): Observable<Education> {
    const eduDoc = doc(this.fireStore, `educations/${id}`);
    return (docData(eduDoc, { idField: 'id' }) as Observable<any>).pipe(
      map(edu => edu ? {
        ...edu,
        startDate: edu.startDate?.toDate ? edu.startDate.toDate() : edu.startDate,
        endDate: edu.endDate?.toDate ? edu.endDate.toDate() : edu.endDate
      } : edu)
    ) as Observable<Education>;
  }

  async addEducation(education: Education): Promise<void> {
    const dataToSave = { ...education };
    Object.keys(dataToSave).forEach(key => (dataToSave as any)[key] === undefined && delete (dataToSave as any)[key]);
    await addDoc(this.educationCollection, dataToSave);
  }

  async updateEducation(id: string, education: Education): Promise<void> {
    const eduDoc = doc(this.fireStore, `educations/${id}`);
    const dataToSave = { ...education };
    delete dataToSave.id;
    Object.keys(dataToSave).forEach(key => (dataToSave as any)[key] === undefined && delete (dataToSave as any)[key]);
    await updateDoc(eduDoc, dataToSave);
  }

  async deleteEducation(id: string): Promise<void> {
    const eduDoc = doc(this.fireStore, `educations/${id}`);
    await deleteDoc(eduDoc);
  }
}