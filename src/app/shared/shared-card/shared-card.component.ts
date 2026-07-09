import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-card.component.html',
  styleUrls: ['./shared-card.component.css']
})
export class SharedCardComponent {
  @Input() fullHeight: boolean = true;
  @Input() justifyActions: string = 'justify-content-end';
}
