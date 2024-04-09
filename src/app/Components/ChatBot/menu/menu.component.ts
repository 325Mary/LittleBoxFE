import { Component } from '@angular/core';
import { SignInUpService } from '../../../services/sign-in-up.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  rolUsuario: string = '';

  constructor(
    private authService: SignInUpService
  ) { this.getRolUser( )}

  selectedOption: string | null = null;

  getRolUser(): void {
    const userRol = this.authService.getUserRole();
    if (userRol !== null) {
      this.rolUsuario = userRol;
      console.log('Rol del usuario', this.rolUsuario);
    } else {
      console.error('No se puedo obtener el rol de usuario');
    }
  }

  showContent(option: string) {
    this.selectedOption = option;
  }
}
