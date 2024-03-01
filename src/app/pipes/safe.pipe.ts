import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string, type: string): SafeResourceUrl {
    switch (type) {
      case 'resource':
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
      default:
        throw new Error(`Invalid safe pipe type: ${type}`);
    }
  }
}
