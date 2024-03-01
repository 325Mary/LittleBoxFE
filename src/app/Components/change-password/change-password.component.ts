import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInUpService } from "../../services/sign-in-up.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  userId: string = '';
  newPassword: string = '';
  constructor(private route: ActivatedRoute, private signInUpService: SignInUpService, private router: Router) { }

  ngOnInit(): void {
    // Obtener el userId de la URL
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      console.log('id:',this.userId)
      // Aquí puedes hacer otras operaciones, como verificar si el userId es válido, etc.
    });
    
  }

  changePassword(): void {
    // Enviar solicitud de cambio de contraseña al servicio
    this.signInUpService.changePassword(this.userId, this.newPassword).subscribe(
      response => {
        // Manejar la respuesta del servicio
        console.log('Cambio de contraseña exitoso:', response);
        // Aquí puedes redirigir a otra página, mostrar un mensaje de éxito, etc.
        // Redirigir a la página de inicio de sesión
        this.signInUpService.logout();
      // Redirigir a la página de inicio de sesión
      this.router.navigate(['/']);
      // Mostrar mensaje de éxito (opcional)
      alert('¡Cambio de contraseña exitoso! Se ha cerrado sesión.');
      },
      error => {
        // Manejar errores
        console.error('Error al cambiar la contraseña:', error);
        // Aquí puedes mostrar un mensaje de error al usuario, etc.
      }
    );
  }
  
}