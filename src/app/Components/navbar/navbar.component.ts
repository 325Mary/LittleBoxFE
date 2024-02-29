import { Component, HostListener, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { SignInUpService } from "../../services/sign-in-up.service";
import { TokenValidationService } from '../../services/token-validation-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit  {
  modalOpen = false;
  isMenuOpen = false;
  isLoggedIn: boolean = false;
  userData: any;
  loginStatusSubscription!: Subscription;
  isGerente: boolean = false;
  isSuperUsuario: boolean = false;
  isAdministrador: boolean = false;
  isColaborador: boolean = false;

  constructor(private router: Router, private authService: SignInUpService, private tokenValidationService: TokenValidationService, private cdr: ChangeDetectorRef) {}

  
  
 
  //vetanas modales
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


  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.closeModal();
        this.checkAuthentication(); // Verificar autenticación al recargar la página
      }
    });

    this.checkAuthentication(); // Verificar autenticación al cargar el componente

    this.loginStatusSubscription = this.authService.loginStatusChanged.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }
  
  
  async checkAuthentication() {
    try {
      const token = localStorage.getItem('token');
      if (token && await this.tokenValidationService.isValidToken(token)) {
        this.isLoggedIn = true;
        this.userData = await this.tokenValidationService.getUserData(token);
        this.setUserRoles(this.userData.rol); // Establecer los roles del usuario
        this.cdr.detectChanges(); // Realizar detección de cambios
      }
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
    }
  }
  
  
  setUserRoles(rol: string) {
    if (rol) {
      this.isGerente = rol === 'Gerente';
      this.isSuperUsuario = rol === 'SuperUsuario';
      this.isAdministrador = rol === 'Administrador';
      this.isColaborador = rol === 'Colaborador';
    }
  }
  

  logout() {
    try {
      // Llamar al método de cierre de sesión del servicio
      this.authService.logout();
      this.isLoggedIn = false; // Actualizar el estado de autenticación
      this.router.navigate(['/']); // Navegar a la ruta predeterminada
      this.cdr.detectChanges(); // Realizar detección de cambios
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
  
}

