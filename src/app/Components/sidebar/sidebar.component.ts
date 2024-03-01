import { Component, HostListener, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { SignInUpService } from "../../services/sign-in-up.service";
import { TokenValidationService } from '../../services/token-validation-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  isLoggedIn: boolean = false;
  userData: any;
  loginStatusSubscription!: Subscription;
  isGerente: boolean = false;
  isSuperUsuario: boolean = false;
  isAdministrador: boolean = false;
  isColaborador: boolean = false;
  constructor(private router: Router, private authService: SignInUpService, private tokenValidationService: TokenValidationService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    

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
}
