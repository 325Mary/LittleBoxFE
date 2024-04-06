import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from '../menu/menu.component';
import { QueriesService } from '../../../services/chatbot/queries.service';
import { SubcategoryService } from '../../../services/chatbot/subcategory.service';
import { CategoryService } from '../../../services/chatbot/category.service';
import { TokenValidationService } from '../../../services/token-validation-service.service';

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
    private tokenValidationService: TokenValidationService
  ) {}

  ngOnInit(): void {
    this.obtenerCategorias();
    if (this.categories.length > 0) {
      this.obtenerSubcategoriasPorCategoria(this.categories[0]._id);
    }
    this.showWelcomeMessage();
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
        '¡Hola! ¿En qué puedo ayudarte hoy? Escribe "Ayuda" para poder explicarte.?',
      respuesta: '',
      profilePicture: 'assets/bot.png',
      origen: 'bot',
    });
    this.scrollToBottom();
  }

  sendMessage() {
    if (this.userInput.toLowerCase() === 'bloque') {
      this.chatHistory.push({
        profilePicture: 'assets/bot.png',
        pregunta:
          'Con gusto te explico, el bloque es un camino para encontrar la respuesta deseada. Como inicio, tendrás que seleccionar una categoría, que es el tema principal. Luego, seleccionas la subcategoría, que es el tema central para identificar si la pregunta se refiere a un funcionamiento, explicación u otra funcionalidad. Finalmente, se muestran las preguntas relacionadas a lo seleccionado, donde encontrarás el identificador y la pregunta. Solo busca la pregunta de tu agrado y pon su identificador en la barra de búsqueda del chatbot, y el chatbot te responderá exitosamente.',
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
    const modalRef = this.modalService.open(MenuComponent, { size: 'lg' });
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
