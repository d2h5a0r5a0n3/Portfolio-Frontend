import { inject, Injectable } from '@angular/core';
import { collectionData, docData, Firestore, addDoc, collection, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Project {
  id?: string;
  order?: number;
  title: string;
  techStack: string;
  description: string;
  github: string;
  demo?: string;
  startDate: Date;
  endDate?: Date;
}

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private fireStore: Firestore = inject(Firestore);

  private projectCollections = collection(this.fireStore, 'projects');

  getProjects(): Observable<Project[]> {
    return (collectionData(this.projectCollections, { idField: 'id' }) as Observable<any[]>).pipe(
      map(projects => projects.map(proj => ({
        ...proj,
        startDate: proj.startDate?.toDate ? proj.startDate.toDate() : proj.startDate,
        endDate: proj.endDate?.toDate ? proj.endDate.toDate() : proj.endDate
      })))
    ) as Observable<Project[]>;
  }

  getProjectById(id: string): Observable<Project> {
    const projectDoc = doc(this.fireStore, `projects/${id}`);
    return (docData(projectDoc, { idField: 'id' }) as Observable<any>).pipe(
      map(proj => proj ? {
        ...proj,
        startDate: proj.startDate?.toDate ? proj.startDate.toDate() : proj.startDate,
        endDate: proj.endDate?.toDate ? proj.endDate.toDate() : proj.endDate
      } : proj)
    ) as Observable<Project>;
  }

  async addProject(project: Project): Promise<void> {
    const dataToSave = { ...project };
    Object.keys(dataToSave).forEach(key => (dataToSave as any)[key] === undefined && delete (dataToSave as any)[key]);
    await addDoc(this.projectCollections, dataToSave);
  }

  async updateProject(id: string, project: Project): Promise<void> {
    const projectDoc = doc(this.fireStore,`projects/${id}`);
    const dataToSave = {...project};
    delete dataToSave.id;
    Object.keys(dataToSave).forEach(key => (dataToSave as any)[key] === undefined && delete (dataToSave as any)[key]);
    await updateDoc(projectDoc,dataToSave);
  }

 async deleteProject(id: string): Promise<void> {
    const projectDoc = doc(this.fireStore, `projects/${id}`);
    await deleteDoc(projectDoc);
  }
}
