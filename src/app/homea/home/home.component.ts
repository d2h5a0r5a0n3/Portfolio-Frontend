import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../service/auth-service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [MatSnackBarModule, CommonModule, RouterModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
	isAdmin: boolean = false;
	isLoginRoute: boolean = false;
	constructor(
		@Inject(PLATFORM_ID) private platformId: Object,
		private snackBar: MatSnackBar,
		private authService: AuthService,
		private router: Router
	) { }
	ngOnInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			this.authService.fetchAndSetAdminStatus();
			this.authService.isAdmin$.subscribe((status) => {
				this.isAdmin = status;
			})
			this.router.events.subscribe(() => {
				this.checkRoute();
			});
			this.checkRoute();
		}
	}

	checkRoute() {
		const currentUrl = this.router.url;
		if (currentUrl.startsWith('/login')) {
			this.isLoginRoute = true;
		} else {
			this.isLoginRoute = false;
		}
		
		if (currentUrl.startsWith('/logout')) {
			this.logout();
		}
	}
	login() {
		this.authService.login().subscribe({
			next: () => {
				this.snackBar.open("Successfully logged in!", "Close", {
					duration: 3000,
					panelClass: ['snackbar-success']
				});
				this.router.navigate(['/']); // Redirect to home after login
			},
			error: (err) => {
				console.error("Login Error:", err);
				this.snackBar.open("Login failed", "Close", {
					duration: 3000,
					panelClass: ['snackbar-success']
				});
			}
		});
	}
	logout() {
		this.authService.logout().subscribe({
			next: () => {
				console.log("Logged Out");
				this.snackBar.open("Successfully logged out", "Close", {
					duration: 3000,
					panelClass: ['snackbar-success']
				});
				localStorage.clear();
			},
			error: (err) => {
				console.error("Logout Error:", err);
				this.snackBar.open("Logout Failed", "Close", {
					duration: 3000,
					panelClass: ['snackbar-success']
				});
			}
		});
	}

}