import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Auth, signOut, authState } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth: Auth = inject(Auth);

    private adminStatusSubject = new BehaviorSubject<boolean>(false);
    isAdmin$ = this.adminStatusSubject.asObservable();

    // TODO: Change this to your actual Google email address!
    private adminEmail = 'dharankalavena@gmail.com';

    constructor() {
        // Automatically listen to auth state changes and update the BehaviorSubject
        authState(this.auth).subscribe((user: any) => {
            if (user && user.email === this.adminEmail) {
                this.adminStatusSubject.next(true);
            } else {
                this.adminStatusSubject.next(false);
                if (user) {
                    this.logout();
                    alert("Unauthorized account. Only the admin can log in.");
                }
            }
        });
    }

    login() {
        const provider = new GoogleAuthProvider();
        return from(signInWithPopup(this.auth as any, provider));
    }

    checkSessionStatus() {
        return authState(this.auth).pipe(
            map(user => ({
                authenticated: !!user,
                username: user?.email || undefined
            }))
        );
    }

    logout() {
        return from(signOut(this.auth));
    }

    getAdminStatus(): Observable<{ isAdmin: boolean }> {
        return authState(this.auth).pipe(
            map(user => ({ isAdmin: !!user }))
        );
    }

    fetchAndSetAdminStatus(): void {
        // Handled automatically in the constructor now
    }
}
