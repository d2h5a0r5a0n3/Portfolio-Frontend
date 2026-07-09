import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkillService } from '../../service/skill-service/skill.service';
import { Skill } from '../../dto/skill/skill';

import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-edit-skill',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, QuillEditorComponent],
  templateUrl: './edit-skill.component.html'
})
export class EditSkillComponent implements OnInit {
  skill: Skill = {
    name: '',
    skillCategory: 'OTHER',
    proficiency: 'BEGINNER',
    description: '',
    iconUrl: ''
  };

  skillCategories: string[] = [];
  proficiencies: string[] = [];
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private service: SkillService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    
    this.service.getSkill(this.id).subscribe(data => {
      this.skill = data;
    });

    this.service.getSkillCategories().subscribe(data => {
      this.skillCategories = data;
    });

    this.service.getProficiencies().subscribe(data => {
      this.proficiencies = data;
    });
  }

  async submitForm(): Promise<void> {
    if (
      !this.skill.name ||
      !this.skill.description ||
      !this.skill.proficiency ||
      !this.skill.skillCategory
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    await this.service.saveSkill({ ...this.skill, id: this.id });
    this.router.navigate(['/skills']);
  }
}
