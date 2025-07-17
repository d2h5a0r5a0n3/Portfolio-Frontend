import { Component, Input, Output, EventEmitter, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { Project } from '../../service/project-service/project.service';
import { AuthService } from '../../service/auth-service/auth.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: Project;
  @Output() deleteProject = new EventEmitter<number>();
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.fetchAndSetAdminStatus();
      this.authService.isAdmin$.subscribe((status) => {
        this.isAdmin = status;
      });
    }
  }

  editProject(): void {
    this.router.navigate(['/edit-project', this.project.id]);
  }

  viewProject(): void {
    this.router.navigate(['/view-project', this.project.id]);
  }

  onDelete(): void {
    if (confirm(`Are you sure you want to delete "${this.project.title}"?`)) {
      this.deleteProject.emit(this.project.id!);
    }
  }
}
