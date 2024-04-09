import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from '../menu/menu.component';
import { QueriesService } from '../../../services/chatbot/queries.service';
import { SubcategoryService } from '../../../services/chatbot/subcategory.service';
import { CategoryService } from '../../../services/chatbot/category.service';
import { TokenValidationService } from '../../../services/token-validation-service.service';

import { SignInUpService } from '../../../services/sign-in-up.service';
import { SeleccionarUsersComponent } from '../seleccionar-users/seleccionar-users.component';

interface Message {
  profilePicture?: string;
  pregunta: string;
  respuesta: string;
  origen: 'usuario' | 'bot';
}

@Component({
  selector: 'app-chatbody',
  templateUrl: './chatbody.component.html',
  styleUrls: ['./chatbody.component.scss'],
})
export class ChatbodyComponent {
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
    private QService: QueriesService,
    private SService: SubcategoryService,
    private CService: CategoryService,
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
      console.error('No se puedo obtener el rol de usuario');
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

  onCategoryChange() {
    this.subcategory = '';
    this.obtenerSubcategoriasPorCategoria(this.category);
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
        '¡Hola! ¿En qué puedo ayudarte hoy? Escribe "ayuda" para poder explicarte.?',
      respuesta: '',
      profilePicture: 'assets/bot.png',
      origen: 'bot',
    });
    this.scrollToBottom();
  }

  sendMessage() {
    if (this.userInput.toLowerCase() === 'ayuda') {
      if (this.rolUsuario === 'Colaborador') {
        this.chatHistory.push({
          profilePicture: 'assets/bot.png',
          pregunta: 'Con gusto te ayudo, como primera instancia tenemos un chatbot en donde puedes consultar tus dudas mediante números. ¿Cómo saber qué número necesitas?\nEn la parte izquierda se aprecia una secuencia, en donde seleccionas la categoría que es como el tema principal de la pregunta. Después, seleccionas una subcategoría que es como el tema de caracterización, es decir, si la pregunta está relacionada con la funcionalidad de la secuancia de la izquierda o una instrucción para consultar en el chatbot. Como último paso, se mostrará una tabla con todas las preguntas disponibles. Para saber su respuesta, solo pon el # en mi barra de búsqueda, y yo con gusto te responderé. Si tienes otra duda no dudes en consultar. :D',
          respuesta: '¿Como funciona el chatbot en base a funcionamiento y itulidad?',
          origen: 'bot',
        });
      } else if (this.rolUsuario === 'Gerente' || this.rolUsuario === 'Administrador') {
        this.chatHistory.push({
          profilePicture: 'assets/bot.png',
          pregunta: 'Con gusto te ayudo, como primera instancia tenemos un chatbot en donde puedes consultar tus dudas mediante números. ¿Cómo saber qué número necesitas?\nEn la parte izquierda se aprecia una secuencia, en donde seleccionas la categoría que es como el tema principal de la pregunta. Después, seleccionas una subcategoría que es como el tema de caracterización, es decir, si la pregunta está relacionada con la funcionalidad de algo o una instrucción para hacer algo. Como último paso, se mostrará una tabla con todas las preguntas disponibles. Para saber su respuesta, solo pon el # en mi barra de búsqueda, y yo con gusto te responderé.\n\nAdemás de eso, en la parte superior derecha estará una tuerca de configuración. ¿Para qué me sirve eso? Te sirve para poder modificar, eliminar o agregar subcategorías y consultas que soporten tu empresa, como temas importantes que para los colaboradores nuevos es indispensable. Se mostrará como entrada un menú y solo debes seleccionar qué deseas configurar, si la consulta o la subcategoría. Te saldrá una tabla y una barra de búsqueda para buscar tu categoría deseada. En la tabla misma encontrarás botones que uno es para borrar y el otro es para editar, y por último, en la parte de arriba derecha encontrarás un botón que dice: "Nuevo", es para crear una nueva consulta o subcategoría. Si tienes otra duda no dudes en consultar. :D',
          respuesta: '¿Como funciona el chatbot en base a funcionamiento y itulidad?',
          origen: 'bot',
        });
      }
      this.scrollToBottom();
      this.userInput = '';
    } else if (this.userInput.toLowerCase() === 'bloque') {
      this.chatHistory.push({
        profilePicture: 'assets/bot.png',
        pregunta: 'Con gusto te explico, el bloque es un camino para encontrar la respuesta deseada. Como inicio, tendrás que seleccionar una categoría, que es el tema principal. Luego, seleccionas la subcategoría, que es el tema central para identificar si la pregunta se refiere a un funcionamiento, explicación u otra funcionalidad. Finalmente, se muestran las preguntas relacionadas a lo seleccionado, donde encontrarás el identificador y la pregunta. Solo busca la pregunta de tu agrado y pon su identificador en la barra de búsqueda del chatbot, y el chatbot te responderá exitosamente.',
        respuesta: '¿Para qué sirve el bloque?',
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
  
      this.getQuery();
      this.userInput = '';
    }
  }

  getQuery() {
    const userInputLower = this.userInput.toLowerCase();
    const tenantId = this.tokenValidationService.getTenantIdFromToken();
    if (!tenantId) {
      console.error('No se pudo obtener el tenantId.');
      return;
    }

    this.QService.getQueryIdentifier(userInputLower, tenantId).subscribe(
      (response) => {
        if (response.status === 200) {
          const query = response.data;
          this.chatHistory.push({
            profilePicture: 'assets/bot.png',
            pregunta: query.answer,
            respuesta: query.question,
            origen: 'bot',
          });
        } else {
          this.chatHistory.push({
            profilePicture: 'assets/bot.png',
            pregunta: 'No se encontró ninguna consulta con ese identificador.',
            respuesta: '',
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
            'Ocurrió un error al obtener la consulta. Por favor, inténtelo de nuevo.',
          respuesta: '',
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
    const modalRef = this.modalService.open(SeleccionarUsersComponent, { size: 'lg' });
  }

  openModalSupe(){
    const modalRef = this.modalService.open(SeleccionarUsersComponent, { size: 'lg' });
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
}
