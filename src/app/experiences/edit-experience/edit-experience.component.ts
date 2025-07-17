import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExperienceService, Experience } from '../../service/experience-service/experience.service';

@Component({
  selector: 'app-edit-experience',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-experience.component.html'
})
export class EditExperienceComponent implements OnInit {
  experience: Experience = {
    role: '',
    company: '',
    jobType: 'FULL_TIME',  // default value
    location: '',
    description: '',
    startDate: new Date(),
    endDate: new Date()
  };

  id!: number;
  startDateInput: string = '';
  endDateInput: string = '';
  currentlyWorking: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: ExperienceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.service.getExperienceById(this.id).subscribe((data) => {
      this.experience = data;
      this.startDateInput = this.experience.startDate
        ? new Date(this.experience.startDate).toISOString().slice(0, 10)
        : '';
      this.endDateInput = this.experience.endDate
        ? new Date(this.experience.endDate).toISOString().slice(0, 10)
        : '';
      this.currentlyWorking = !this.experience.endDate;
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

    this.experience.startDate = start;
    this.experience.endDate = end;

    this.service.updateExperience(this.id, this.experience).subscribe(() => {
      this.router.navigate(['/experiences']);
    });
  }
}
