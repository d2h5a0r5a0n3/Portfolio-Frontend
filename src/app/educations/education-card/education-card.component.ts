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
import { AuthService } from '../../service/auth-service/auth.service';
import { Education } from '../education';

@Component({
  selector: 'app-education-card',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './education-card.component.html',
  styleUrls: ['./education-card.component.css']
})
export class EducationCardComponent implements OnInit {
  @Input() education!: Education;
  @Output() deleteEducation = new EventEmitter<number>();
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

  viewEducation(): void {
    this.router.navigate(['/view-education', this.education.id]);
  }

  editEducation(): void {
    this.router.navigate(['/edit-education', this.education.id]);
  }

  onDelete(): void {
    if (confirm(`Are you sure you want to delete "${this.education.degree}"?`)) {
      this.deleteEducation.emit(this.education.id!);
    }
  }
}
