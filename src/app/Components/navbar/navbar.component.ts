import { Component, HostListener, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavigationStart, Router } from '@angular/router'; // Import Router here
import { SignInUpService } from "../../services/sign-in-up.service";
import { TokenValidationService } from '../../services/token-validation-service.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from "../../services/notification.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
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
  notificationsCount = 0;

  constructor(private router: Router, private authService: SignInUpService,
    private tokenValidationService: TokenValidationService,
    private cdr: ChangeDetectorRef, private dialog: MatDialog,
    private notificationService: NotificationService)
  {
    this.router.events.subscribe((val) => {
      this.currentRoute = this.router.url;
    });
  }

  showNotifications: boolean = false;

  closeNotifications(): void {
    this.showNotifications = false;
  }

  openNotifications(): void {
    this.showNotifications = !this.showNotifications;
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

    this.refreshNotifications(); // Actualizar el contador de notificaciones al iniciar el componente
  }

  async refreshNotifications(): Promise<void> {
    try {
      const notifications = await this.notificationService.getNotificationsByUserId().toPromise();

      // Verificar si notifications no es undefined antes de acceder a la propiedad length
      if (notifications !== undefined) {
        // Contar las notificaciones no leídas
        this.notificationsCount = notifications.filter(notification => !notification.read).length;
      }
    } catch (error) {
      console.error('Error al obtener las notificaciones:', error);
    }
  }

  async checkAuthentication(): Promise<void> {
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

  setUserRoles(rol: string): void {
    if (rol) {
      this.isGerente = rol === 'Gerente';
      this.isSuperUsuario = rol === 'SuperUsuario';
      this.isAdministrador = rol === 'Administrador';
      this.isColaborador = rol === 'Colaborador';
    }
  }

  logout(): void {
    try {
      this.authService.logout();
      this.isLoggedIn = false;
      this.router.navigate(['/']);
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  openModal(): void {
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  
}
