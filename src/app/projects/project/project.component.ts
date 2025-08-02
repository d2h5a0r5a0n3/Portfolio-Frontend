import { Component, OnInit } from '@angular/core';
import { ProjectService, Project } from '../../service/project-service/project.service';
import { Router } from '@angular/router';
import { NgIf, NgFor, NgStyle } from '@angular/common';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { AuthService } from '../../service/auth-service/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-project',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  standalone: true,
  imports: [NgIf, NgFor, NgStyle, MatSnackBarModule, ProjectCardComponent, MatTooltipModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  isAdmin: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private projectService: ProjectService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.fetchAndSetAdminStatus();
    this.authService.isAdmin$.subscribe((status) => {
      this.isAdmin = status;
    });

    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }

  goToAddProject(): void {
    this.router.navigate(['/new-project']);
  }

  deleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe(() => {
      this.projects = this.projects.filter(p => p.id !== id);
      this.snackBar.open('Project deleted successfully', 'Close', { duration: 3000 });
    });
  }
}
