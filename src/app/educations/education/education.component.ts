import { Component, OnInit } from '@angular/core';
import { EducationService } from '../../service/education-service/education.service';
import { AuthService } from '../../service/auth-service/auth.service';
import { Router } from '@angular/router';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EducationCardComponent } from '../education-card/education-card.component';
import { trigger, style, animate, transition } from '@angular/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Education } from '../education';

@Component({
  selector: 'app-education',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  standalone: true,
  imports: [NgIf, NgFor, MatSnackBarModule, EducationCardComponent, NgStyle, MatTooltipModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  educations: Education[] = [];
  isAdmin: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private educationService: EducationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.fetchAndSetAdminStatus();
    this.authService.isAdmin$.subscribe((status) => {
      this.isAdmin = status;
    });

    this.educationService.getEducations().subscribe((data) => {
      this.educations = data;
    });
  }

  goToAddEducation(): void {
    this.router.navigate(['/new-education']);
  }

  deleteEducation(id: number): void {
    this.educationService.deleteEducation(id).subscribe(() => {
      this.educations = this.educations.filter(e => e.id !== id);
      this.snackBar.open('Education deleted successfully', 'Close', {
        duration: 3000
      });
    });
  }
}
