import { DatePipe } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input() title?: string;
  @Input() content?: string;
  @Input() date?: Date;
}
