import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../service/auth-service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isDark = false;
  isAdmin$: Observable<boolean>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private authService: AuthService) {
    this.isAdmin$ = this.authService.isAdmin$;
    if (isPlatformBrowser(this.platformId)) {
      this.isDark = localStorage.getItem('theme') === 'dark';
      this.applyTheme();
    }
  }

  toggleTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isDark = !this.isDark;
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
      this.applyTheme();
    }
  }

  applyTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const body = document.body;
      body.classList.toggle('dark-theme', this.isDark);
    }
  }
}
