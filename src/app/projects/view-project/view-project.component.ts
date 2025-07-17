import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService, Project } from '../../service/project-service/project.service';
@Component({
	selector: 'app-view-project',
	standalone: true,
	imports: [CommonModule,RouterLink],
	templateUrl: './view-project.component.html',
	styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
	project!: Project;
	constructor(private route: ActivatedRoute, private projectService: ProjectService) { }
	ngOnInit(): void {
		const id = Number(this.route.snapshot.paramMap.get('id'));
		this.projectService.getProjectById(id).subscribe((data) => {
			this.project = data;
		});
	}
}