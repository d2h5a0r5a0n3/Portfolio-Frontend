import { Component } from '@angular/core';
import { ProjectService, Project } from '../../service/project-service/project.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './new-project.component.html'
})
export class NewProjectComponent {
  project: Project = {
    title: '',
    techStack: '',
    description: '',
    github: '',
    demo: '',
    startDate: new Date(),
    endDate: new Date()
  };

  startDateInput: string = '';
  endDateInput: string = '';
  currentlyWorking: boolean = false;

  constructor(private service: ProjectService, private router: Router) {}

  submitForm(): void {
    const start = new Date(this.startDateInput);
    let end: Date | undefined;

    if (
      !this.project.title ||
      !this.project.techStack ||
      !this.project.description ||
      !this.startDateInput ||
      (!this.currentlyWorking && !this.endDateInput)
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    if (isNaN(start.getTime())) {
      alert('Invalid start date.');
      return;
    }

    if (!this.currentlyWorking) {
      end = new Date(this.endDateInput);
      if (isNaN(end.getTime())) {
        alert('Invalid end date.');
        return;
      }
    }

    this.project.startDate = start;
    this.project.endDate = this.currentlyWorking ? undefined : end;

    this.service.addProject(this.project).subscribe(() => {
      this.router.navigate(['/projects']);
    });
  }
}
