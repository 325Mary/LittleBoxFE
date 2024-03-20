import { Component, HostListener, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavigationStart, Router } from '@angular/router'; // Import Router here
import { SignInUpService } from "../../services/sign-in-up.service";
import { TokenValidationService } from '../../services/token-validation-service.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsComponent } from "../notifications/notifications.component";
import {NotificationService} from "../../services/notification.service";

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
  currentRoute: string = '';
  notificationsCount = 0; // Suponiendo que tienes un conteo de notificaciones


  constructor(private router: Router, private authService: SignInUpService, 
    private tokenValidationService: TokenValidationService, 
    private cdr: ChangeDetectorRef, private dialog: MatDialog,
    private notificationService: NotificationService ) 
  { this.router.events.subscribe((val) => {
    this.currentRoute = this.router.url;
  });}

  showNotifications: boolean = false;

  closeNotifications(): void {
    this.showNotifications = false;
  }

  openNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }
  
  
 
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
    const target = event.target as HTMLElement;
    if (!target.closest('.notification-container') && !target.closest('button[mat-icon-button]')) {
      this.closeNotifications();
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

    this.notificationService.getNotificationsByUserId().subscribe(
      (notifications) => {
        // Actualizar el contador de notificaciones
        this.notificationsCount = notifications.length;
      },
      (error) => {
        console.error('Error al obtener las notificaciones:', error);
      }
    );
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
 
  // @HostListener('document:click', ['$event'])
  // handleClick1(event: MouseEvent) {
  //   const target = event.target as HTMLElement;
  //   if (!target.closest('.notification-container') && !target.closest('button[mat-icon-button]')) {
  //     this.closeNotifications();
  //   }
  // }
}

