import { Component } from '@angular/core';
import { SignInUpService } from "../../services/sign-in-up.service";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-registro-empleado',
  templateUrl: './registro-empleado.component.html',
  styleUrls: ['./registro-empleado.component.scss']
})
export class RegistroEmpleadoComponent {
  defaultRole: any;
  selectedCompanys: string = '';
  companys: any =[];
  User = {
    username: '',
    identification: '',
    telephone: '',
    email: '',
    tenantId: '',
    direction: '',
    rol:'Colaborador'
  }
    // imgfirme: '' as string | File  }
 
  constructor(private userService: SignInUpService,  private route: ActivatedRoute,  private router: Router) { }

  // handleFileInput(event: any): void {
  //   const file = event.target.files[0];
  //   this.User.imgfirme = file;
  // }
  
  registrar(): void {
    const formData = new FormData();

    formData.append('username', this.User.username);
    formData.append('telephone', this.User.telephone);
    formData.append('identification', this.User.identification);
    formData.append('email', this.User.email);
    formData.append('tenantId', this.User.tenantId);
    formData.append('direction', this.User.direction);
    formData.append('rol', this.User.rol); 

    // if (this.User.imgfirme instanceof File) {
    //   formData.append('imgfirme', this.User.imgfirme);
    // }
    this.userService.registrarUsuario(formData).subscribe(response => {
      // console.log('Usuario registrado:', response);
      this.router.navigate(['/']);

      alert('¡Datos de usuario enviandos con exito!')
    }, error => {
      // console.error('Error al registrar:', error);
      alert('ERROR al enviar datos. Intentelo nuevamente')
    });
  }

  ngOnInit(): void {
    this.listCompanys();
    // this.listRoles(); // Se llama a listRoles para cargar la lista de roles
  }

  listCompanys(): void {
    this.userService.listCompanys().subscribe(
      (data) => {
        this.companys = data;
        if (this.companys.length > 0) {
          this.User.tenantId = this.companys[0].nameCompany;
        }
      },
      (error) => {
        console.error('Error al obtener empresas', error);
      }
    );
  }

  // listRoles(): void {
  //   this.userService.listRoles().subscribe(
  //     (data) => {
  //       this.rol = data; 
  //       // Aquí establece el rol por defecto según tu lógica
  //       this.defaultRole = this.rol.find(rol => rol.nameRol === 'Colaborador');
  //       this.selectedRole = this.defaultRole; // Establece el rol por defecto como seleccionado
  //     },
  //     (error) => {
  //       console.error('Error al obtener roles', error);
  //     }
  //   );
  // }
}
