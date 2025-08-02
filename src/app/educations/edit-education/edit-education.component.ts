import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EducationService } from '../../service/education-service/education.service';
import { Education } from '../education';

@Component({
  selector: 'app-edit-education',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-education.component.html'
})
export class EditEducationComponent implements OnInit {
  education: Education = {
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: new Date(),
    endDate: new Date(),
    description: ''
  };

  id!: number;
  startDateInput: string = '';
  endDateInput: string = '';
  currentlyStudying: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: EducationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.service.getEducationById(this.id).subscribe((data) => {
      this.education = data;
      this.startDateInput = this.education.startDate
        ? new Date(this.education.startDate).toISOString().slice(0, 10)
        : '';
      this.endDateInput = this.education.endDate
        ? new Date(this.education.endDate).toISOString().slice(0, 10)
        : '';
      this.currentlyStudying = !this.education.endDate;
    });
  }

  submitForm(): void {
    const start = new Date(this.startDateInput);
    const end = this.currentlyStudying ? undefined : new Date(this.endDateInput);

    if (
      isNaN(start.getTime()) ||
      (!this.currentlyStudying && (!this.endDateInput || isNaN(end!.getTime())))
    ) {
      alert('Please enter valid start and end dates.');
      return;
    }

    this.education.startDate = start;
    this.education.endDate = end;

    this.service.updateEducation(this.id, this.education).subscribe(() => {
      this.router.navigate(['/educations']);
    });
  }
}
