import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-resume-display',
    standalone: true,
    imports: [NgIf],
    templateUrl: './resume-display.component.html',
    styleUrls: ['./resume-display.component.css'],
})
export class ResumeDisplayComponent implements OnInit {
    sanitizedUrl?: SafeResourceUrl;

    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/resume.pdf');
    }
}
