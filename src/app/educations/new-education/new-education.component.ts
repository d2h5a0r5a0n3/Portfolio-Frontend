import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EducationService } from '../../service/education-service/education.service';
import { Education } from '../education';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-education',
  standalone: true,
  templateUrl: './new-education.component.html',
  styleUrls: ['./new-education.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, QuillEditorComponent]
})
export class NewEducationComponent {
  education: Education = {
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: new Date(),
    endDate: new Date(),
    description: ''
  };

  currentlyStudying = false;
  startDateInput = '';
  endDateInput = '';

  constructor(private service: EducationService, private router: Router) {}

  async submitForm(): Promise<void> {
    const start = new Date(this.startDateInput);
    const end = this.currentlyStudying ? undefined : new Date(this.endDateInput);

    if (
      !this.education.institution ||
      !this.education.degree ||
      !this.education.fieldOfStudy ||
      !this.education.description ||
      !this.startDateInput ||
      (!this.currentlyStudying && !this.endDateInput)
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    if (isNaN(start.getTime()) || (!this.currentlyStudying && end && isNaN(end.getTime()))) {
      alert('Invalid date(s) provided.');
      return;
    }

    this.education.startDate = start;
    this.education.endDate = end;

    await this.service.addEducation(this.education);
    this.router.navigate(['/educations']);
  }
}
