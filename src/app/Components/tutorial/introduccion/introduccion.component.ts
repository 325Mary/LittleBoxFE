import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-introduccion',
  templateUrl: './introduccion.component.html',
  styleUrls: ['./introduccion.component.scss']
})
export class IntroduccionComponent {
  constructor(private elementRef: ElementRef) {}

  titulos: string[] = [
    "Registro de usuario empresa",
    "Autenticación y inicio de sesión (usuario gerente)",
    "Explicación contenido home (gerente)",
    "Funcionalidades de gerente (gerente)",
    "Creación de nuevo rol (gerente)",
    "Inicio de sesion como administrador (administrador)",
    "Registro como Colaborador (empleado)",
    "Aprobación y inicio de sesion Colaborador (usuario empleado)",
    "Creacion de solicitud (empleado)",
    "Cambio de estados de solicitud y creacion de egresos (empleado & administrado)",
    "Explicación de graficos e informes (gerente)",
  ];

  subtitulos: string[] = [
    "El video contiene la demostración para registrarte como empresa en nuestra aplicación:",
    "El video contiene la explicación faltante de las funciones al iniciar:",
    "El video contiene la explicación de algunas funcionalidades del gerente:",
    "El video contiene la creación de un nuevo rol con funcionalidades especificas:",
    "El video contiene el inicio de sesion para el rol anterior:",
    "El video contiene la demostración para registrarse como colaborador: ",
    "El video contiene la creación de nuestra primer solicitud:",
    "El video contiene la el cambio de estados generales en las solicitudes:",
    "El video contiene la expliacación con ejemplos de graficos y informes:",
    
  ];

  descripciones: string[][] = [
    [
      "Durante el video, te proporcionaré una explicación detallada de cada paso del proceso de registro como empresa, junto con definiciones claras para asegurarnos de que comprendas completamente cada etapa.",
      "En este video, detallaré la importancia de cada campo en nuestros formularios de registro. Esta explicación te proporcionará una comprensión clara de los requisitos necesarios para completar el registro de manera exitosa. Al finalizar el proceso de registro, recibirás una breve explicación para guiarte hacia el siguiente paso de manera fluida."
    ],
    
    [
      "Durante el video, te mostrare como iniciar sesión como empresa con los datos proporcionados por la aplicación.",
      "Además, contendra una demostración de las condiciones al iniciar sesión por primera vez."
    ],

    [
      "Durante el video, te proporcionaré una explicación no tan detallada de los formatos que se encuentran en el inicio.",
      "Además, contendra una definición basica para entender a que rol pertenece cada acción y la importancia de flujos de roles."
    ],

    [
      "Este video es fundamental para todos los gerentes, contendra un paso a paso de todo lo que se debe hacer con anterioridad.",
      "Además, tendrá demostraciones para creaciones de muchas de las funciones que estan proporcionadas solo para gerente."
    ],

    [
      "Este video es fundamental para la creación de un rol en especifico, este rol es el encargado de la gestión dentro de la app.",
      "En el video se podra apreciar paso a paso la creación de este rol, además mostrara algunas funciones adicionales sobre el gerente."
    ],

    [
      "Demostración de los datos de la cuenta para iniciar sesión como administrador.",
      "Demostración de como iniciar sesión como administrador.",
      "Explicación basica de la dependecia del rol administrador con otro rol aparte."
    ],

    [
      "El video contiene el registro de un nuevo rol.",
      "Además, tendrá una expliación importante sobre el formulario de registro.",
    ],

    [
      "El video contiene la demostración para la aprobación del rol anterior, esta funcionalidad es proporcianado para el administrador.",
      "Además, muestra la aprobación y los datos fundamentales para el inicio de sesión para el rol de colaborador .",
    ],
    
    [
      "Este video muestra la capacidad y funcionalidades que puede hacer el colaborador.",
      "Además, contiene algunas expliaciones relevantes sobre formularios, funcionalidades y acciones.",
    ],

    [
      "Este video puede ser algo largo porque contiene un flujo entre solicitud y egresos.",
      "Además, contiene una expliación de los estados para las solicitudes, el flujo de los estados y que hacer despues de cada estado.",
      "Por contraparte, tambien muestra la creación de egresos y la explicación de su funcionalidad en base a la relación con las solicitudes",
    ],

    [
      "Como ultimo video, obtendran la demostración de la funcionalidad de graficos y informes.",
      "Además, contiene una expliación de paso a paso para cada funcionalidad.",
    ],
    
  ];

  videos: string[] = [ 
    "../../../../assets/Registro de empresa ‐ Clipchamp.mp4",
    "../../../../assets/Autenticacion y inicio sesion Clipchamp.mp4",
    "../../../../assets/Explicación de contenido de home Clipchamp.mp4",
    "../../../../assets/Funcionalidades de gerente Clipchamp.mp4",
    "../../../../assets/Creación de administrador ‐ Hecho con Clipchamp.mp4",
    "../../../../assets/Inicio de sesion como Administrador Clipchamp.mp4",
    "../../../../assets/Registro de colaborador Clipchamp.mp4",
    "../../../../assets/Aprobación y inicio de sesión de colaborador Clipchamp.mp4",
    "../../../../assets/Creación de una solicitud Clipchamp.mp4",
    "../../../../assets/Cambio de estados de solicitudes y utilización de egresos Clipchamp.mp4",
    "../../../../assets/Gráficos y informes explicación Clipchamp.mp4",
  ];

  ngAfterViewInit() {
    const modalElements = this.elementRef.nativeElement.querySelectorAll('.modal');
  
    modalElements.forEach((modalElement: HTMLElement) => {
      modalElement.addEventListener('hidden.bs.modal', () => {
        const videoElement = modalElement.querySelector('video');
        if (videoElement && !videoElement.paused) {
          videoElement.pause();
        }
      });
    });
  }
}
