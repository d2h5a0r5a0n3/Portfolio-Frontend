import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExperienceService, Experience } from '../../service/experience-service/experience.service';

@Component({
  selector: 'app-view-experience',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-experience.component.html',
  styleUrls: ['./view-experience.component.css']
})
export class ViewExperienceComponent implements OnInit {
  experience!: Experience;

  constructor(private route: ActivatedRoute, private experienceService: ExperienceService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.experienceService.getExperienceById(id).subscribe((data) => {
      this.experience = data;
    });
  }
}
