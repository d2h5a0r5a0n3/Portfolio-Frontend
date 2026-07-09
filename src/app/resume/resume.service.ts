import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ResumeMetadata {
    id?: string;
    filename: string;
    originalName: string;
  uploadTime: string;
    active: boolean;
    downloadUrl: string;
}

@Injectable({ providedIn: 'root' })
export class ResumeService {
    // Instead of Firebase, we just return the local static file URL
    getActiveResume(): Observable<ResumeMetadata | undefined> {
        return of({
            filename: 'resume.pdf',
            originalName: 'resume.pdf',
            uploadTime: new Date().toISOString(),
            active: true,
            downloadUrl: '/assets/resume.pdf'
        });
    }
}
