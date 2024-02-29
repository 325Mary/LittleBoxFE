import { Component } from '@angular/core';
import { SignInUpService } from "../../services/sign-in-up.service";
import { response } from 'express';
import { error } from 'console';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.scss']
})
export class RegistroEmpresaComponent {
company = {
  nameCompany: '',
    telephoneCompany: '',
    tenantId:'',
    emailCompany: '',
    directionCompany:'',
    pdfRunt: '' 
    
}

  User = {
    username: '',
    identification: '',
    telephone: '',
    email: '',
    tenantId: '',
    direction: '',
    rol:'Gerente'
  }
  selectedRole: any; 
  defaultRole: any;

  constructor(private singService: SignInUpService, private route: ActivatedRoute,  private router: Router) { }


  send(){
    this.singService.createCompany(this.company).subscribe(
      
      response=> console.log('Datos enviados', response),
      error =>console.log('Error al enviar Datos', error)
      
      
    )
  }

  registrar(): void {
    const formData = new FormData();

    formData.append('username', this.User.username);
    formData.append('telephone', this.User.telephone);
    formData.append('identification', this.User.identification);
    formData.append('email', this.User.email);
    formData.append('tenantId', this.User.tenantId);
    formData.append('direction', this.User.direction);
    formData.append('rol', this.User.rol);


    this.singService.registrarUsuario(formData).subscribe(response => {
      console.log('Usuario registrado:', response);
      this.router.navigate(['/']);
      // Mostrar mensaje de éxito (opcional)
      alert('¡Envio de datos Exitoso!. este atento a su correo a la novedad de su usuario');
    }, error => {
      console.error('Error al registrar:', error);
      alert('Ocurrio un error al registrarse. ¡Intente Nuevamente!')

    });
  }
sendAndRegistrar(): void {
  this.User.tenantId = this.company.tenantId;

    this.send();
    this.registrar();

  }

  
 
  
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0]; // Obtener el archivo seleccionado
    const fileReader = new FileReader();
    
    fileReader.onload = () => {
      // Cuando la lectura del archivo esté completa
      // Asignar el contenido del archivo (sin prefijo de ruta) a company.pdfRunt
      this.company.pdfRunt = fileReader.result as string; // Esto asume que pdfRunt es de tipo string
    };
    
    // Leer el contenido del archivo como una URL de datos (data URL)
    fileReader.readAsDataURL(selectedFile);
  }
  
 
}
