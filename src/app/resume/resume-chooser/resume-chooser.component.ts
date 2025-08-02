import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ResumeService } from '../resume.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-resume-chooser',
    standalone: true,
    imports: [FormsModule, NgFor, NgClass,NgIf],
    templateUrl: './resume-chooser.component.html',
    styleUrls: ['./resume-chooser.component.css'],
})
export class ResumeChooserComponent implements OnInit {
    resumes: any[] = [];
    selectedResume: any;

    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

    constructor(private resumeService: ResumeService, private router: Router) { }

    ngOnInit(): void {
        this.loadResumes();
    }

    loadResumes(): void {
        this.resumeService.getAllResumes().subscribe((data) => {
            this.resumes = [...data]; // force change detection
            const active = this.resumes.find((r) => r.active);
            this.selectedResume = active || (this.resumes.length > 0 ? this.resumes[0] : null);
        });
    }

    setActiveResume(): void {
        if (!this.selectedResume) return;
        this.resumeService.setActiveResume(this.selectedResume.id).subscribe(() => {
            alert('Resume updated');
            this.router.navigate(['/resume']);
        });
    }
    viewResume(filename: string): void {
        const fileUrl = `http://localhost:9091/api/resumes/${filename}`;
        window.open(fileUrl, '_blank');
    }


    triggerFileInput(): void {
        this.fileInput.nativeElement.click();
    }

    uploadResume(event: any): void {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        this.resumeService.uploadResume(formData).subscribe(() => {
            alert('Resume uploaded');
            this.selectedResume = null;
            this.loadResumes();
        });
    }

    deleteResume(id: number): void {
        if (confirm('Are you sure you want to delete this resume?')) {
            this.resumeService.deleteResume(id).subscribe(() => {
                alert('Resume deleted');
                this.resumes = this.resumes.filter(r => r.id !== id);
                if (this.selectedResume?.id === id) {
                    this.selectedResume = null;
                }
                setTimeout(() => {
                    this.selectedResume = this.resumes.find(r => r.active) || (this.resumes.length > 0 ? this.resumes[0] : null);
                }, 0);
                window.location.reload();
            });
        }
    }


    trackById(index: number, item: any): number {
        return item.id;
    }
}