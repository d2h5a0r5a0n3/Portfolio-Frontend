import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private adminStatusSubject = new BehaviorSubject<boolean>(false);
    isAdmin$ = this.adminStatusSubject.asObservable();
    constructor(private http: HttpClient) { }
    login(username: string, password: string) {
        const encodedUsername = encodeURIComponent(username);
        const encodedPassword = encodeURIComponent(password);
        return this.http.post(
            `http://localhost:9091/api/login?username=${encodedUsername}&password=${encodedPassword}`,
            null,
            { withCredentials: true, responseType: 'text' as 'json' }
        );
    }
    checkSessionStatus() {
        return this.http.get<{ authenticated: boolean, username?: string }>(
            'http://localhost:9091/api/session/status',
            { withCredentials: true, responseType: 'text' as 'json' }
        );
    }
    logout() {
        return this.http.post(
            'http://localhost:9091/api/logout',
            null,
            { withCredentials: true, responseType: 'text' as 'json' }
        );
    }


    getAdminStatus(): Observable<{ isAdmin: boolean }> {
        return this.http.get<{ isAdmin: boolean }>('http://localhost:9091/api/is-admin', {
            withCredentials: true
        });
    }

    fetchAndSetAdminStatus(): void {
        this.getAdminStatus().subscribe({
            next: (data) => {
                this.adminStatusSubject.next(data.isAdmin);
            },
            error: (err) => {
                this.adminStatusSubject.next(false);
            }
        });
    }
}
