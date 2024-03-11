import { Component } from '@angular/core';
import { SignInUpService } from "../../services/sign-in-up.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent {
  email: string = '';
  codigo: string = '';
  newPassword: string ='';
  mostrarCodigoInput: boolean = false; // Variable para controlar la visibilidad del bloque de entrada del código

  constructor(private authService: SignInUpService, private router: Router) {}

  solicitarRestablecimiento() {
    this.authService.enviarCodigoRestablecimiento(this.email).subscribe(
      response => {
        console.log('Código de restablecimiento enviado:', response);
        // Manejar la respuesta según sea necesario (mostrar mensaje al usuario, redirigir, etc.)
        this.mostrarCodigoInput = true; // Mostrar el bloque de entrada del código después de enviar la solicitud
      },
      error => {
        console.error('Error al solicitar restablecimiento:', error);
        // Manejar el error (mostrar mensaje de error al usuario, etc.)
      }
    );
  }

  resetPasswordhtml() {
    this.authService.resetPassword(this.email, this.codigo, this.newPassword).subscribe(
      response => {
        console.log('Contraseña restablecida con éxito:', response);
        // Manejar la respuesta según sea necesario (mostrar mensaje al usuario, redirigir, etc.)
        this.router.navigate(['/']); 
        alert('¡Cambio de contraseña exitoso! .');


      },
      error => {
        console.error('Error al restablecer contraseña:', error);
        alert('Codigo Incorrecto');

        // Manejar el error (mostrar mensaje de error al usuario, etc.)
      }
    );
  }
}
