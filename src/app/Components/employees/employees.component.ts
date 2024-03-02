// employees.component.ts
import { Component, OnInit } from '@angular/core';
import { SignInUpService } from "../../services/sign-in-up.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent  implements OnInit {
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

  // Método para inactivar un usuario
  inactivarUsuario(userId: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se proporcionó un token válido.');
      return;
    }
    this.signInUpService.inactiveUser(userId, token).subscribe(
      response => {
        console.log('Usuario inactivado:', response);
        // Actualizar la lista de usuarios después de inactivar uno
        this.obtenerUsuariosPorTenantId();
        alert('Usuario Inactivo')
      },
      error => {
        console.error('Error al inactivar el usuario:', error);
      }
    );
  }
}

