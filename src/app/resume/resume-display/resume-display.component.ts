import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../service/auth-service/auth.service';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { ResumeService } from '../resume.service';

@Component({
    selector: 'app-resume-display',
    standalone: true,
    imports: [NgIf,NgClass],
    templateUrl: './resume-display.component.html',
    styleUrls: ['./resume-display.component.css'],
})
export class ResumeDisplayComponent implements OnInit {
    sanitizedUrl?: SafeResourceUrl;
    isAdmin = false;

    constructor(
        private sanitizer: DomSanitizer,
        private authService: AuthService,
        private router: Router,
        private resumeService: ResumeService
    ) { }

    ngOnInit(): void {
        this.authService.isAdmin$.subscribe((status) => (this.isAdmin = status));

        this.resumeService.getActiveResume().subscribe({
            next: (resume) => {
                const fileUrl = `http://localhost:9091/api/resumes/${resume.filename}`;
                this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);

            },
            error: (err) => {
                console.error('Failed to load active resume:', err);
            }
        });
    }

    openResumeChooser(): void {
        this.router.navigate(['/choose-resume']);
    }
}
