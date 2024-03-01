import { Component, OnInit } from '@angular/core';
import { SignInUpService } from "../../services/sign-in-up.service";
import { Observable } from 'rxjs';
@Component({
  selector: 'app-soli-colaboradores',
  templateUrl: './soli-colaboradores.component.html',
  styleUrl: './soli-colaboradores.component.scss'
})
export class SoliColaboradoresComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private signInUpService: SignInUpService) { }

  ngOnInit(): void {
    this.obtenerUsuariosPorTenantId();
  }

  obtenerUsuariosPorTenantId() {
    this.signInUpService.getUsersByTenantId().subscribe(
      (usuarios: any[]) => {
        this.usuarios = usuarios;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  // Método para activar un usuario
  activarUsuario(userId: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se proporcionó un token válido.');
      return;
    }
    this.signInUpService.activeUser(userId, token).subscribe(
      response => {
        console.log('Usuario activado:', response);
        // Actualizar la lista de usuarios después de activar uno
        this.obtenerUsuariosPorTenantId();
        alert('Usuario Activo')
      },
      error => {
        console.error('Error al activar el usuario:', error);
      }
    );
  }

  // Método para denegar un usuario
  deniedUsuario(userId: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se proporcionó un token válido.');
      return;
    }
    this.signInUpService.denyUser(userId, token).subscribe(
      response => {
        console.log('Usuario Denegado:', response);
        // Actualizar la lista de usuarios después de inactivar uno
        this.obtenerUsuariosPorTenantId();
        alert('Usuario Denegado')
      },
      error => {
        console.error('Error al inactivar el usuario:', error);
      }
    );
  }
}

