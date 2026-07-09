import { Component, OnInit } from '@angular/core';
import { ExperienceService, Experience } from '../../service/experience-service/experience.service';
import { AuthService } from '../../service/auth-service/auth.service';
import { Router } from '@angular/router';
import { NgFor, NgIf, NgStyle, DatePipe } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ExperienceCardComponent } from '../experience-card/experience-card.component';
import { trigger, style, animate, transition, } from '@angular/animations';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-experience',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  standalone: true,
  imports: [NgIf,NgFor, MatSnackBarModule, ExperienceCardComponent, NgStyle,MatTooltipModule, DatePipe],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];
  isAdmin: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private experienceService: ExperienceService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.fetchAndSetAdminStatus();
    this.authService.isAdmin$.subscribe((status) => {
      this.isAdmin = status;
    });

    this.experienceService.getExperiences().subscribe((data) => {
      this.experiences = data.sort((a, b) => (a.order || 0) - (b.order || 0));
    });
  }

  goToAddExperience(): void {
    this.router.navigate(['/new-experience']);
  }

  async deleteExperience(id: string): Promise<void> {
    await this.experienceService.deleteExperience(id);
    this.experiences = this.experiences.filter(e => e.id !== id);
    this.snackBar.open('Experience deleted successfully', 'Close', {
      duration: 3000
    });
  }
}
