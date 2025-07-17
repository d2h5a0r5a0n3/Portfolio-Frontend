import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService, Project } from '../../service/project-service/project.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-project.component.html'
})
export class EditProjectComponent implements OnInit {
  project: Project = {
    title: '',
    techStack: '',
    description: '',
    github: '',
    demo: '',
    startDate: new Date(),
    endDate: new Date()
  };

  id!: number;
  startDateInput: string = '';
  endDateInput: string = '';
  currentlyWorking: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.service.getProjectById(this.id).subscribe((data) => {
      this.project = data;

      // Format the dates to yyyy-MM-dd for input type="date"
      this.startDateInput = this.project.startDate
        ? new Date(this.project.startDate).toISOString().slice(0, 10)
        : '';
      this.endDateInput = this.project.endDate
        ? new Date(this.project.endDate).toISOString().slice(0, 10)
        : '';
      this.currentlyWorking = !this.project.endDate;
    });
  }

  submitForm(): void {
    const start = new Date(this.startDateInput);
    const end = this.currentlyWorking ? undefined : new Date(this.endDateInput);
    if (
      isNaN(start.getTime()) ||
      (!this.currentlyWorking && (!this.endDateInput || isNaN(end!.getTime())))
    ) {
      alert('Please enter valid start and end dates.');
      return;
    }

    this.project.startDate = start;
    this.project.endDate = end;

    this.service.updateProject(this.id, this.project).subscribe(() => {
      this.router.navigate(['/projects']);
    });
  }
}
