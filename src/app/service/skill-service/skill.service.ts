import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Skill } from '../../dto/skill/skill';
import { Firestore, collectionData, docData, addDoc, collection, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class SkillService {
  private fireStore: Firestore = inject(Firestore);
  private skillsCollection = collection(this.fireStore, 'skills');

  getAllSkills(): Observable<Skill[]> {
    return collectionData(this.skillsCollection, { idField: 'id' }) as Observable<Skill[]>;
  }

  getSkill(id: string): Observable<Skill> {
    const skillDoc = doc(this.fireStore, `skills/${id}`);
    return docData(skillDoc, { idField: 'id' }) as Observable<Skill>;
  }

  async saveSkill(skill: Skill): Promise<void> {
    if (skill.id) {
      const skillDoc = doc(this.fireStore, `skills/${skill.id}`);
      const dataToSave = { ...skill };
      delete dataToSave.id;
      await updateDoc(skillDoc, dataToSave);
    } else {
      await addDoc(this.skillsCollection, skill);
    }
  }

  async deleteSkill(id: string): Promise<void> {
    const skillDoc = doc(this.fireStore, `skills/${id}`);
    await deleteDoc(skillDoc);
  }

  getProficiencies(): Observable<string[]> {
    return of(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']);
  }

  getSkillCategories(): Observable<string[]> {
    return of(['FRONTEND', 'BACKEND', 'DATABASE', 'DEVOPS', 'OTHER']);
  }

  getSkillActions(): Observable<string[]> {
    return of(['LEARNING', 'USING', 'MASTERING']);
  }
}
