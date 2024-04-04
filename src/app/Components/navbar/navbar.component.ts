import { Component, HostListener, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { SignInUpService } from "../../services/sign-in-up.service";
import { TokenValidationService } from '../../services/token-validation-service.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { SidebarComponent } from '../sidebar/sidebar.component';
// import { SidebarService } from '../../services/sidebar.service';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

 
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  items: MenuItem[] = [];
  modalOpen = false;
  isMenuOpen = false;
  isLoggedIn = false;
  userData: any;
  loginStatusSubscription!: Subscription;
  isGerente = false;
  isSuperUsuario = false;
  isAdministrador = false;
  isColaborador = false;
  currentRoute = '';

  constructor(
    private router: Router,
    private authService: SignInUpService,
    private tokenValidationService: TokenValidationService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.checkAuthentication();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.currentRoute = this.router.url;
        this.closeModal();
      }
    });

    this.loginStatusSubscription = this.authService.loginStatusChanged.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.updateMenuItems();
    });
  }

  closeCallback(e:any): void {
    this.sidebarRef.close(e);
}

sidebarVisible: boolean = false;

  async checkAuthentication() {
    try {
      const token = localStorage.getItem('token');
      if (token && await this.tokenValidationService.isValidToken(token)) {
        this.isLoggedIn = true;
        this.userData = await this.tokenValidationService.getUserData(token);
        this.setUserRoles(this.userData.rol);
        this.updateMenuItems();
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

  updateMenuItems() {
    this.items = [
      { label: 'Gráficos', icon: 'pi pi-chart-bar', routerLink: '/graficos', style: { 'color': 'white' }, visible: this.isLoggedIn && (this.isAdministrador || this.isGerente) },
      {
        separator: true
      },
      { label: 'Informes', icon: 'pi pi-file', routerLink: '/Informes', styleClass: 'custom-menu-item', visible: this.isLoggedIn && (this.isAdministrador || this.isGerente) },
      { label: 'Ingresos', icon: 'pi pi-arrow-up', routerLink: '/obtenerTodosLosIngresos', styleClass: 'custom-menu-item', visible: this.isLoggedIn && (this.isAdministrador || this.isGerente) },
      { label: 'Crear Egreso', icon: 'pi pi-arrow-down', routerLink: '/crearEgreso', styleClass: 'custom-menu-item', visible: this.isLoggedIn && (this.isAdministrador || this.isGerente) },
      { label: 'Solicitudes', icon: 'pi pi-list', routerLink: '/obtenerTodasLasSolicitudes', styleClass: 'custom-menu-item', visible: this.isLoggedIn && (this.isAdministrador || this.isGerente || this.isColaborador) },
    ];
  }
 

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    if (this.isMenuOpen && !(event.target as Element)?.closest('.menu-container') && !(event.target as Element)?.closest('.contenedor-img')) {
      this.isMenuOpen = false;
    }
  }

  logout() {
    try {
      this.authService.logout();
      this.isLoggedIn = false;
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }
}