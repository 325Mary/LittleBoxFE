import { Component } from '@angular/core';

@Component({
  selector: 'app-wtmenu',
  templateUrl: './wtmenu.component.html',
  styleUrl: './wtmenu.component.scss'
})
export class WTMenuComponent {
  selectedOption: string | null = null;

  showContent(option: string) {
    this.selectedOption = option;
  }
}
