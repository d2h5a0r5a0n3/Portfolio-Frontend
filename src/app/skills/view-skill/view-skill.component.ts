import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SkillService } from '../../service/skill-service/skill.service';
import { Skill } from '../../dto/skill/skill';

@Component({
  selector: 'app-view-skill',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-skill.component.html',
  styleUrls: ['./view-skill.component.css']
})
export class ViewSkillComponent implements OnInit {
  skill!: Skill;

  constructor(private route: ActivatedRoute, private skillService: SkillService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.skillService.getSkill(id).subscribe((data) => {
      this.skill = data;
    });
  }
}
