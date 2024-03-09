import { Component } from '@angular/core';
import { } from ''

@Component({
  selector: 'app-movable-image',
  templateUrl: './movable-image.component.html',
  styleUrl: './movable-image.component.scss'
})
export class MovableImageComponent {

  left = 0;
  top = 0;
  isDragging = false;

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
  }

  onMouseUp(event: MouseEvent) {
    if (this.isDragging) {

      this.router.navigateByUrl('/chatbot');
    }
    this.isDragging = false;
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.left = event.clientX;
      this.top = event.clientY;
    }
  }

}
