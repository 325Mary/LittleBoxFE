import { Component, OnInit } from '@angular/core';
import { SignInUpService } from "../../services/sign-in-up.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-registro',
  templateUrl: './pre-registro.component.html',
  styleUrls: ['./pre-registro.component.scss']
})
export class PreRegistroComponent implements OnInit {
  pestanaActual: string = 'valorInicial'; 
  user = {
    email: '',
    password: ''
  };
  mensajeError: string = '';
  rutaSeleccionada: any;

  constructor(private userService: SignInUpService, private router: Router) { }
 
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const pestanaGuardada = localStorage.getItem('pestanaActual');
      if (pestanaGuardada) {
        this.pestanaActual = pestanaGuardada;
      }
    }
  }

  onSubmit() {
    this.userService.login(this.user).subscribe(
      response => {
        if (response.error) {
          this.mensajeError = 'Error al iniciar sesión';
          console.error('Error de inicio de sesión:', response.error);
        } else {
          // Verificar si la respuesta contiene el userId y firstLogin es true
          if (response.userId && response.token && response.firstLogin) {
            // Guardar userId y token en localStorage
            localStorage.setItem('userId', response.userId);
            localStorage.setItem('token', response.token);
            // Mostrar alerta y navegar al componente ChangePasswordComponent
            if (confirm('Por favor, cambie su contraseña.')) {
              this.router.navigate(['/changePassword', response.userId]);  
                      }
          } else {
            // Si no es el primer inicio de sesión, redirigir al home
            this.router.navigate(['home']);
          }
          this.mensajeError = '';
          console.log('Inicio de sesión exitoso:', response);
        }
      },
      httpError => {
        this.mensajeError = 'Error al iniciar sesión';
        console.error('Error HTTP en inicio de sesión:', httpError);
      }
    );
  }

  cambiarPestana(pestana: string): void {
    this.pestanaActual = pestana;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('pestanaActual', pestana);
    }
  }

  navegar() {
    if (this.rutaSeleccionada) {
      this.router.navigate([this.rutaSeleccionada]);
    }
  }

  redirigirARestablecerContrasena() {
    this.router.navigate(['/restorePassword/']); // Reemplaza '/restablecer-contraseña' con la ruta real de tu componente de restablecimiento de contraseña
  }
}
