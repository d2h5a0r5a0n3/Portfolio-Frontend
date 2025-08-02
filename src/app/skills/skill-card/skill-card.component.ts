import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    Inject,
    PLATFORM_ID
  } from '@angular/core';
  import { Router } from '@angular/router';
  import { isPlatformBrowser, NgIf, CommonModule } from '@angular/common';
  import { AuthService } from '../../service/auth-service/auth.service';
import { Skill } from '../../dto/skill/skill';
  
  @Component({
    selector: 'app-skill-card',
    standalone: true,
    imports: [CommonModule, NgIf],
    templateUrl: './skill-card.component.html',
    styleUrls: ['./skill-card.component.css']
  })
  export class SkillCardComponent implements OnInit {
    @Input() skill!: Skill;
    @Output() deleteSkill = new EventEmitter<number>();
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
  
    viewSkill(): void {
      this.router.navigate(['/view-skill', this.skill.id]);
    }
  
    editSkill(): void {
      this.router.navigate(['/edit-skill', this.skill.id]);
    }
  
    onDelete(): void {
      if (confirm(`Are you sure you want to delete "${this.skill.name}"?`)) {
        this.deleteSkill.emit(this.skill.id!);
      }
    }
  }
  