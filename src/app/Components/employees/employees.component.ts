// employees.component.ts
import { Component, OnInit } from '@angular/core';
import { SignInUpService } from "../../services/sign-in-up.service";
import { Observable } from 'rxjs';
import { SweetAlertService } from "../../services/sweet-alert.service";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent  implements OnInit {


  usuarios: any[] = [];

  constructor(private signInUpService: SignInUpService, private sweetAlert:SweetAlertService) { }

  ngOnInit(): void {
    this.obtenerUsuariosPorTenantId();
  }

  obtenerUsuariosPorTenantId() {
    this.signInUpService.getUsersByTenantId().subscribe(
      (usuarios: any[]) => {
        console.log(usuarios)
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
        // alert('Usuario Activo')
        this.sweetAlert.showSuccessToast("El Usuario ha sido activado correctamente!")
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
        // alert('Usuario Inactivo')
        this.sweetAlert.showSuccessToast("El Usuario ha sido activado correctamente!")
      },
      error => {
        console.error('Error al inactivar el usuario:', error);
      }
    );
  }
}

