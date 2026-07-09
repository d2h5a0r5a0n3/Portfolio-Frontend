import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkillService } from '../../service/skill-service/skill.service';
import { Skill } from '../../dto/skill/skill';

import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-new-skill',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, QuillEditorComponent],
  templateUrl: './new-skill.component.html'
})
export class NewSkillComponent implements OnInit {
  skill: Skill = {
    name: '',
    skillCategory: 'OTHER',
    proficiency: 'BEGINNER',
    description: '',
    iconUrl: ''
  };

  skillCategories: string[] = [];
  proficiencies: string[] = [];

  constructor(private service: SkillService, private router: Router) {}

  ngOnInit(): void {
    this.service.getSkillCategories().subscribe(data => {
      this.skillCategories = data;
      this.skill.skillCategory = data[0];
    });

    this.service.getProficiencies().subscribe(data => {
      this.proficiencies = data;
      this.skill.proficiency = data[0];
    });
  }

  async submitForm(): Promise<void> {
    if (
      !this.skill.name ||
      !this.skill.skillCategory ||
      !this.skill.proficiency ||
      !this.skill.description
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    await this.service.saveSkill(this.skill);
    this.router.navigate(['/skills']);
  }
}
