import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ResumeService {
    constructor(private http: HttpClient) { }

    getAllResumes() {
        return this.http.get<any[]>(`http://localhost:9091/api/resumes?ts=${Date.now()}`);
    }

    setActiveResume(id: number) {
        return this.http.put(`http://localhost:9091/api/resumes/set-active/${id}`, null, { withCredentials: true });
    }


    uploadResume(data: FormData) {
        return this.http.post(`http://localhost:9091/api/resumes/upload`, data, { withCredentials: true });
    }

    getActiveResume() {
        return this.http.get<{
            id: number,
            filename: string,
            originalName: string,
            uploadTime: string,
            fileHash: string,
            active: boolean
        }>('http://localhost:9091/api/resumes/active');
    }
    deleteResume(id: number) {
        return this.http.delete(`http://localhost:9091/api/resumes/${id}`, { withCredentials: true });
    }

}
