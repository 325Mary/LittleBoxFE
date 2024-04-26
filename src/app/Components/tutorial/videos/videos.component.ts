import { Component } from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent {
  
  additionalVideos1 = [
    { titulo:'Regristro', video: 'pbmqJqz204o' },
    { titulo:'Aprobacion y ingreso', video: '04mfKJWDSzI' },
  ];

  additionalVideos2 = [
    { titulo: 'Funcionalidades', video: '7h2ryr_uUEs' },
    { titulo: 'Creacion de administrado', video: 'HyHNuVaZJ-k' },
  ];

  additionalVideos3 = [
    { video: '7h2ryr_uUEs' },
    { video: 'HyHNuVaZJ-k' },
  ];

  additionalVideos4 = [
    { video: '7h2ryr_uUEs' },
    { video: 'HyHNuVaZJ-k' },
  ];

  showMoreVideos: boolean[] = [false, false];
  currentVideo: string = '';

  constructor() {}

  toggleMoreVideos(index: number) {
    this.showMoreVideos[index] = !this.showMoreVideos[index];
  }

  playVideo(video: any) {
    this.currentVideo = video.video;
  }
}
