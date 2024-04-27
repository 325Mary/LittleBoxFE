import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-introduccion',
  templateUrl: './introduccion.component.html',
  styleUrls: ['./introduccion.component.scss']
})
export class IntroduccionComponent {
  constructor(private elementRef: ElementRef) {}

  titulos: string[] = [
    "Registro de usuario empresa",
    "Autenticación y inicio de sesión (usuario empresa)",
  ];

  ngAfterViewInit() {
    const modalElement = this.elementRef.nativeElement.querySelector('.modal');

    modalElement.addEventListener('hidden.bs.modal', () => {
      const videoElement = this.elementRef.nativeElement.querySelector('video');
      if (videoElement && !videoElement.paused) {
        videoElement.pause();
      }
    });
  }
}
