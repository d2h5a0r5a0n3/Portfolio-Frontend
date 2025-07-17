import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
	import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth-service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [MatSnackBarModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
	isAdmin: boolean = false;
	username = "Admin";
	password = "";
	constructor(
		@Inject(PLATFORM_ID) private platformId: Object,
		private snackBar: MatSnackBar,
		private http: HttpClient,
		private authService: AuthService,
		private route: ActivatedRoute,
		private router: Router
	) { }
	ngOnInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			this.authService.fetchAndSetAdminStatus();
			this.authService.isAdmin$.subscribe((status) => {
				this.isAdmin = status;
			})
			const currentUrl = this.router.url;
			if (currentUrl.startsWith('/login')) {
				this.route.queryParamMap.subscribe(params => {
					const pwd = params.get('password');
					if (pwd) {
						this.password = pwd;
						this.login();
					}
				});
			} else if (currentUrl.startsWith('/logout')) {
				this.logout();
			}
		}
	}
	login() {
		this.authService.login(this.username, this.password).subscribe({
			next: (data) => {
				this.snackBar.open(String(data), "Close", {
					duration: 3000,
					panelClass: ['snackbar-success']
				});
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
			next: (data) => {
				console.log("Logged Out:", data);
				this.snackBar.open(String(data), "Close", {
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