import { Component, OnInit } from '@angular/core';
import { ProjectService, Project } from '../../service/project-service/project.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { AuthService } from '../../service/auth-service/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [NgIf, NgFor, ProjectCardComponent, MatSnackBarModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  isAdmin: boolean = false;

  constructor(private snackBar: MatSnackBar, private projectService: ProjectService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.fetchAndSetAdminStatus();
    this.authService.isAdmin$.subscribe((status)=>{
      this.isAdmin=status;
    })
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
    });
  }
}
