import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExperienceService, Experience } from '../../service/experience-service/experience.service';

@Component({
  selector: 'app-new-experience',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './new-experience.component.html'
})
export class NewExperienceComponent {
  experience: Experience = {
    role: '',
    company: '',
    jobType: 'FULL_TIME',
    startDate: new Date(),
    description: '',
    location: ''
  };

  startDateInput: string = '';
  endDateInput: string = '';
  currentlyWorking: boolean = false;

  constructor(private service: ExperienceService, private router: Router) {}

  submitForm(): void {
    const start = new Date(this.startDateInput);
    const end = this.currentlyWorking ? undefined : new Date(this.endDateInput);

    if (
      !this.experience.role ||
      !this.experience.company ||
      !this.experience.location ||
      !this.experience.description ||
      !this.startDateInput ||
      (!this.currentlyWorking && !this.endDateInput)
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    if (isNaN(start.getTime()) || (!this.currentlyWorking && end && isNaN(end.getTime()))) {
      alert('Invalid date(s) provided.');
      return;
    }

    this.experience.startDate = start;
    this.experience.endDate = end;

    this.service.addExperience(this.experience).subscribe(() => {
      this.router.navigate(['/experiences']);
    });
  }
}
