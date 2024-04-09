// import { Component } from '@angular/core';
// import { TercerosService } from "../../services/terceros.service";
// import { JwtHelperService } from '@auth0/angular-jwt'; // Importa JwtHelperService
// import { ActivatedRoute, Router } from '@angular/router';
// import Swal from 'sweetalert2';


// @Component({
//   selector: 'app-crear-tercero',
//   templateUrl: './crear-tercero.component.html',
//   styleUrls: ['./crear-tercero.component.scss'] // La propiedad se llama styleUrls, no styleUrl
// })
// export class CrearTerceroComponent {
//   tercero: any = {}; // Objeto para almacenar los datos del tercero
//   tenantId: string = ''; // Inicializamos tenantId con un valor por defecto

//   constructor(
//     private terceroService: TercerosService,
//     private jwtHelper: JwtHelperService, // Inyecta JwtHelperService en el constructor
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     // Obtener el token de autenticación del lugar donde lo tengas almacenado (por ejemplo, localStorage)
//   const token = localStorage.getItem('token');

//   if (token !== null) {
//     // Decodificar el token para obtener el tenantId utilizando JwtHelperService
//     const decodedToken: any = this.jwtHelper.decodeToken(token);
//     if (decodedToken && decodedToken.tenantId) {
//       this.tenantId = decodedToken.tenantId;
//       console.log('Este es el tenantId:', this.tenantId);
//     } else {
//       console.error('El token no contiene el campo tenantId.');
//     }
//   } else {
//     console.error('No se encontró ningún token en el almacenamiento local.');
//     // Manejar el caso en el que no se encuentra el token
//   }
//   }

//   guardarTercero(): void {
//     // Llama al servicio para guardar el tercero
//     this.terceroService.guardarTercero(this.tercero)
//       .subscribe(
//         response => {
//           Swal.fire('¡Tercero Creado Exitosamente!');
//           this.router.navigate(['/listTerceros']);

//           console.log('Tercero guardado exitosamente:', response);
//           // Limpia el formulario o realiza alguna acción adicional
//         },
//         error => {
//           console.error('Error al guardar tercero:', error);
//           // Maneja el error según tus necesidades
//         }
//       );
//   }
// }



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TercerosService } from '../../services/terceros.service';
import { JwtHelperService } from '@auth0/angular-jwt'; // Import JwtHelperService
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-tercero',
  templateUrl: './crear-tercero.component.html',
  styleUrls: ['./crear-tercero.component.scss']
})
export class CrearTerceroComponent implements OnInit {
  terceroForm: FormGroup = new FormGroup({}); // Initialize with an empty FormGroup
  tercero: any = {}; // Object to store tercero data
  tenantId: string = ''; // Initialize tenantId with a default value

  constructor(
    private fb: FormBuilder, // Inject FormBuilder for reactive forms
    private terceroService: TercerosService,
    private jwtHelper: JwtHelperService, // Inject JwtHelperService
    private router: Router
  ) {}

  ngOnInit(): void {
    // Create reactive form with validation rules
    this.terceroForm = this.fb.group({
      nombreTercero: ['', Validators.required],
      documentoTercero: ['', Validators.required],
      direccionTercero: ['', Validators.required],
      telefonoTercero: ['', Validators.required],
      emailTercero: ['', [Validators.required, Validators.email]] // Email validation
    });

    // Get authentication token from storage
    const token = localStorage.getItem('token');

    if (token !== null) {
      // Decode token to get tenantId using JwtHelperService
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      if (decodedToken && decodedToken.tenantId) {
        this.tenantId = decodedToken.tenantId;
        console.log('This is the tenantId:', this.tenantId);
      } else {
        console.error('Token does not contain tenantId field.');
      }
    } else {
      console.error('No token found in local storage.');
      // Handle the case where no token is found
    }
  }

  guardarTercero(): void {
    if (this.terceroForm.invalid) {
      // Display error messages if the form is invalid
      console.error('Invalid form data:', this.terceroForm.errors);
      return;
    }

    // Set tenantId in the tercero object
    this.tercero.tenantId = this.tenantId;

    // Call service to save tercero
    this.terceroService.guardarTercero(this.tercero)
      .subscribe(
        response => {
          Swal.fire('¡Tercero Creado Exitosamente!');
          this.router.navigate(['/listTerceros']);

          console.log('Tercero saved successfully:', response);
          // Clear the form or perform additional actions
        },
        error => {
          console.error('Error al guardar tercero:', error);
          // Handle error according to your needs
        }
      );
  }
}

