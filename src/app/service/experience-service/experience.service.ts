import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Firestore, collectionData, docData, addDoc, collection, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';

export interface Experience {
    id?: string;
    order?: number;
    role: string;
    company: string;
    jobType: string;
    startDate: Date;
    endDate?: Date;
    description: string;
    location: string;
}

@Injectable({
    providedIn: 'root'
})
export class ExperienceService {
    private fireStore: Firestore = inject(Firestore);
    private experienceCollection = collection(this.fireStore, 'experiences');

    getExperiences(): Observable<Experience[]> {
        return (collectionData(this.experienceCollection, { idField: 'id' }) as Observable<any[]>).pipe(
            map(experiences => experiences.map(exp => ({
                ...exp,
                startDate: exp.startDate?.toDate ? exp.startDate.toDate() : exp.startDate,
                endDate: exp.endDate?.toDate ? exp.endDate.toDate() : exp.endDate
            })))
        ) as Observable<Experience[]>;
    }

    getExperienceById(id: string): Observable<Experience> {
        const expDoc = doc(this.fireStore, `experiences/${id}`);
        return (docData(expDoc, { idField: 'id' }) as Observable<any>).pipe(
            map(exp => exp ? {
                ...exp,
                startDate: exp.startDate?.toDate ? exp.startDate.toDate() : exp.startDate,
                endDate: exp.endDate?.toDate ? exp.endDate.toDate() : exp.endDate
            } : exp)
        ) as Observable<Experience>;
    }

    async addExperience(experience: Experience): Promise<void> {
        const dataToSave = { ...experience };
        Object.keys(dataToSave).forEach(key => (dataToSave as any)[key] === undefined && delete (dataToSave as any)[key]);
        await addDoc(this.experienceCollection, dataToSave);
    }

    async updateExperience(id: string, experience: Experience): Promise<void> {
        const expDoc = doc(this.fireStore, `experiences/${id}`);
        const dataToSave = { ...experience };
        delete dataToSave.id;
        Object.keys(dataToSave).forEach(key => (dataToSave as any)[key] === undefined && delete (dataToSave as any)[key]);
        await updateDoc(expDoc, dataToSave);
    }

    async deleteExperience(id: string): Promise<void> {
        const expDoc = doc(this.fireStore, `experiences/${id}`);
        await deleteDoc(expDoc);
    }

    getJobTypes(): Observable<string[]> {
        return of(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'FREELANCE', 'INTERNSHIP']);
    }
}
