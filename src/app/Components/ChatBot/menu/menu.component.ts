import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  selectedOption: string | null = null;

  showContent(option: string) {
    this.selectedOption = option;
  }
}
