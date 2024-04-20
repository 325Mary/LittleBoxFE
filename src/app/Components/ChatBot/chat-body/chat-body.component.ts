import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { TokenValidationService } from '../../../services/token-validation-service.service';

import { SignInUpService } from '../../../services/sign-in-up.service';
import { SQueryService } from '../../../services/ChatBot/squery.service';
import { SSubcategoryService } from '../../../services/ChatBot/ssubcategory.service';
import { SCategoryService } from '../../../services/ChatBot/scategory.service';
import { MenusBotComponent } from '../menus-bot/menus-bot.component';







interface Message {
  profilePicture?: string;
  pregunta: string;
  respuesta: string;
  origen: 'usuario' | 'bot';
}

@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrl: './chat-body.component.scss'
})
export class ChatBodyComponent {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  rolUsuario: string = '';

  userInput: string = '';
  chatHistory: Message[] = [];

  category: string = '';
  subcategory: string = '';
  categories: any[] = [];
  subcategories: any[] = [];
  queries: any[] = [];

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private QService: SQueryService,
    private SService: SSubcategoryService,
    private CService: SCategoryService,
    private tokenValidationService: TokenValidationService,
    private authService: SignInUpService
  ) {}

  ngOnInit(): void {
    this.getRolUser();
    this.obtenerCategorias();
    if (this.categories.length > 0) {
      this.obtenerSubcategoriasPorCategoria(this.categories[0]._id);
    }
    this.showWelcomeMessage();
  }

  //ROles:
  getRolUser(): void {
    const userRol = this.authService.getUserRole();
    if (userRol !== null) {
      this.rolUsuario = userRol;
      console.log('Rol del usuario', this.rolUsuario);
    } else {
      console.error('No se pudo obtener el rol de usuario');
    }
  }

  obtenerCategorias() {
    const tenantId = this.tokenValidationService.getTenantIdFromToken();
    if (tenantId) {
      this.CService.showCategories(tenantId).subscribe(
        (data) => {
          this.categories = data;
        },
        (error) => {
          console.error('Error obteniendo categorías:', error);
        }
      );
    } else {
      console.error('No se pudo obtener el tenantId.');
    }
  }

  obtenerSubcategoriasPorCategoria(categoriaId: string) {
    const tenantId = this.tokenValidationService.getTenantIdFromToken();

    if (tenantId) {
      this.SService.getSubcategoryByCategory(categoriaId, tenantId).subscribe(
        (data) => {
          this.subcategories = data;
        }
      );
    } else {
      console.error('No se pudo obtener el tenantId.');
    }
  }

  onCategoryChange(categoryId: string) {
    this.category = categoryId;
    this.subcategory = '';
    this.obtenerSubcategoriasPorCategoria(categoryId);
  }

  onSubcategoryChange() {
    const tenantId = this.tokenValidationService.getTenantIdFromToken();

    if (tenantId) {
      this.QService.getQueriesBySubcategory(
        this.subcategory,
        tenantId
      ).subscribe(
        (data) => {
          this.queries = data;
        },
        (error) => {
          console.error('Error obteniendo consultas:', error);
        }
      );
    } else {
      console.error('No se pudo obtener el tenantId.');
    }
  }

  showWelcomeMessage() {
    this.chatHistory.push({
      pregunta:
        '',
      respuesta: '¡Hola! ¿En qué puedo ayudarte hoy? Escribe "ayuda" para poder explicar mi funcionalidad.',
      profilePicture: 'assets/bot.png',
      origen: 'bot',
    });
    this.scrollToBottom();
  }

  sendMessage() {
    if (this.userInput.toLowerCase() === 'ayuda') {
      if (this.rolUsuario === 'Colaborador') {
        this.chatHistory.push({
          profilePicture: '',
          pregunta: '',
          respuesta: '¿Qué funcionamiento y utilidad contiene el chatbot?',
          origen: 'usuario',
        });
        this.chatHistory.push({
          profilePicture: 'assets/bot.png',
          pregunta:
            '',
          respuesta:
            'Con gusto te ayudo, tengo como funcionalidad en ayudarte y apoyarte de manera que sea tu mano derecha sobre el conocimineto de la aplicación o tu modalidad laboral, como primera instacia, para consultar preguntas que son muy a fondo, en el apartado izquierdo conoceras un camino que te ayudará a llegar a tu repuesta deseada, espero ser de mucho utilidad :D.',
          origen: 'bot',
        });
      } else if (
        this.rolUsuario === 'Gerente' ||
        this.rolUsuario === 'Administrador'
      ) {

        this.chatHistory.push({
          profilePicture: '',
          pregunta: '¿Como funciona el chatbot en base a funcionamiento y itulidad?',
          respuesta: '',
          origen: 'usuario',
        });
        this.chatHistory.push({
          profilePicture: 'assets/bot.png',
          pregunta:
            '',
          respuesta:
            'Con gusto te ayudo, como primera instancia tenemos un chatbot en donde puedes consultar tus dudas mediante números. ¿Cómo saber qué número necesitas?\nEn la parte izquierda se aprecia una secuencia, en donde seleccionas la categoría que es como el tema principal de la pregunta. Después, seleccionas una subcategoría que es como el tema de caracterización, es decir, si la pregunta está relacionada con la funcionalidad de algo o una instrucción para hacer algo. Como último paso, se mostrará una tabla con todas las preguntas disponibles. Para saber su respuesta, solo pon el # en mi barra de búsqueda, y yo con gusto te responderé.\n\nAdemás de eso, en la parte superior derecha estará una tuerca de configuración. ¿Para qué me sirve eso? Te sirve para poder modificar, eliminar o agregar subcategorías y consultas que soporten tu empresa, como temas importantes que para los colaboradores nuevos es indispensable. Se mostrará como entrada un menú y solo debes seleccionar qué deseas configurar, si la consulta o la subcategoría. Te saldrá una tabla y una barra de búsqueda para buscar tu categoría deseada. En la tabla misma encontrarás botones que uno es para borrar y el otro es para editar, y por último, en la parte de arriba derecha encontrarás un botón que dice: "Nuevo", es para crear una nueva consulta o subcategoría. Si tienes otra duda no dudes en consultar. :D',
          origen: 'bot',
        });
      }
      this.scrollToBottom();
      this.userInput = '';
    } else if (this.userInput.toLowerCase() === 'caja') {
      
      this.chatHistory.push({
        profilePicture: '',
        pregunta: '¿Para qué sirve la caja de preguntas?',
        respuesta: '',
        origen: 'usuario',
      });

      this.chatHistory.push({
        profilePicture: 'assets/bot.png',
        pregunta:
          '',
        respuesta: 'Con gusto te explico, la caja es un camino para encontrar la respuesta deseada. Como inicio, tendrás que seleccionar una categoría, que es el tema principal. Luego, seleccionas la subcategoría, que es el tema central para identificar si la pregunta se refiere a un funcionamiento, explicación u otra funcionalidad. Finalmente, se muestran las preguntas relacionadas a lo seleccionado, donde encontrarás el identificador y la pregunta. Solo busca la pregunta de tu agrado y pon su identificador en la barra de búsqueda del chatbot, y el chatbot te responderá exitosamente.',
        origen: 'bot',
      });
      this.scrollToBottom();
      this.userInput = '';
    } else {
      this.chatHistory.push({
        profilePicture: '',
        pregunta: this.userInput,
        respuesta: '',
        origen: 'usuario',
      });

      this.getQuery(this.userInput);
      this.userInput = '';
    }
  }

  getQuery(userInput: string) {
    const tenantId = this.tokenValidationService.getTenantIdFromToken();
    if (!tenantId) {
      console.error('No se pudo obtener el tenantId.');
      return;
    }
  
    this.QService.getQueryIdentifier(userInput, tenantId).subscribe(
      (response) => {
        if (response.status === 200) {
          const query = response.data;
        
          this.chatHistory.push({
            profilePicture: '',
            pregunta: query.question,
            respuesta: '',
            origen: 'usuario',
          });
          
          this.chatHistory.push({
            profilePicture: 'assets/bot.png',
            pregunta: ' ', 
            respuesta: query.answer,
            origen: 'bot',
          });
        } else {

          this.chatHistory.push({
            profilePicture: 'assets/bot.png',
            pregunta: '',
            respuesta: 'No se encontró ninguna consulta con esa pregunta.',
            origen: 'bot',
          });
        }
        this.scrollToBottom();
      },
      (error) => {
        console.error(error);
      
        this.chatHistory.push({
          profilePicture: 'assets/bot.png',
          pregunta:
            '',
          respuesta: 'Ocurrió un error al obtener la consulta. Por favor, inténtelo de nuevo.',
          origen: 'bot',
        });
        this.scrollToBottom();
      }
    );
  }
  

  showUnknownMessage() {
    this.chatHistory.push({
      pregunta: this.userInput,
      respuesta: 'No entiendo.',
      profilePicture: 'assets/bot.png',
      origen: 'bot',
    });
    this.scrollToBottom();
  }

  openModal() {
    const modalRef = this.modalService.open(MenusBotComponent, {
      size: 'lg',
    });
  }

  openModalSupe() {
    const modalRef = this.modalService.open(MenusBotComponent, {
      size: 'lg',
    });
  }

  cerrarModal() {
    this.activeModal.close('Modal cerrado');
  }

  scrollToBottom() {
    try {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
  getQueriesBySubcategory(subcategoryId: string) {
    const tenantId = this.tokenValidationService.getTenantIdFromToken();
    if (tenantId) {
      this.QService.getQueriesBySubcategory(subcategoryId, tenantId).subscribe(
        (data) => {
          this.queries = data;
        },
        (error) => {
          console.error('Error obteniendo consultas:', error);
        }
      );
    } else {
      console.error('No se pudo obtener el tenantId.');
    }
  }

}
