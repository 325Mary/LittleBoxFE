import { Component, HostListener,   ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  modalOpen = false;
  isMenuOpen = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.closeModal();
      }
    });
  }
  
  
  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }
  


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    if (this.isMenuOpen && (event.target as Element)?.closest('.menu-container') == null && (event.target as Element)?.closest('.contenedor-img') == null) {
      this.isMenuOpen = false;
    }
  }


  
}
