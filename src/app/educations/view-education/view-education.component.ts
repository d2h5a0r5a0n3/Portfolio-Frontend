import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../service/education-service/education.service';
import { Education } from '../education';

@Component({
  selector: 'app-view-education',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-education.component.html',
  styleUrls: ['./view-education.component.css']
})
export class ViewEducationComponent implements OnInit {
  education!: Education;

  constructor(private route: ActivatedRoute, private service: EducationService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getEducationById(id).subscribe(data => {
      this.education = data;
    });
  }
}
