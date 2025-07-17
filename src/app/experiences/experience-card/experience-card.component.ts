import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser, CommonModule, NgIf } from '@angular/common';
import { Experience } from '../../service/experience-service/experience.service';
import { AuthService } from '../../service/auth-service/auth.service';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.css']
})
export class ExperienceCardComponent implements OnInit {
  @Input() experience!: Experience;
  @Output() deleteExperience = new EventEmitter<number>();
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.fetchAndSetAdminStatus();
      this.authService.isAdmin$.subscribe((status) => {
        this.isAdmin = status;
      });
    }
  }

  viewExperience(): void {
    this.router.navigate(['/view-experience', this.experience.id]);
  }

  editExperience(): void {
    this.router.navigate(['/edit-experience', this.experience.id]);
  }

  onDelete(): void {
    if (confirm(`Are you sure you want to delete "${this.experience.role}"?`)) {
      this.deleteExperience.emit(this.experience.id!);
    }
  }
}
