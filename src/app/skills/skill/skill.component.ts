import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../service/skill-service/skill.service';
import { AuthService } from '../../service/auth-service/auth.service';
import { Router } from '@angular/router';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SkillCardComponent } from '../skill-card/skill-card.component';
import { trigger, style, animate, transition } from '@angular/animations';
import { Skill } from '../../dto/skill/skill';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-skill',
  standalone: true,
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  imports: [NgIf, NgFor, NgStyle, MatTooltipModule, SkillCardComponent],
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  skills: Skill[] = [];
  isAdmin = false;

  constructor(
    private skillService: SkillService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.fetchAndSetAdminStatus();
    this.authService.isAdmin$.subscribe((status) => {
      this.isAdmin = status;
    });

    this.skillService.getAllSkills().subscribe((data) => {
      this.skills = data;
    });
  }

  goToAddSkill(): void {
    this.router.navigate(['/new-skill']);
  }

  deleteSkill(id: number): void {
    this.skillService.deleteSkill(id).subscribe(() => {
      this.skills = this.skills.filter(skill => skill.id !== id);
      this.snackBar.open('Skill deleted successfully', 'Close', { duration: 3000 });
    });
  }
}
