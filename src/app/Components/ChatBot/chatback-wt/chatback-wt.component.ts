import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuerywtService } from '../../../services/chatbot/chatbackWT/querywt.service';
import { SubcategoryWtService } from '../../../services/chatbot/chatbackWT/subcategory-wt.service';
import { CategoryWtService } from '../../../services/chatbot/chatbackWT/category-wt.service';
import { SeleccionarUsersComponent } from '../seleccionar-users/seleccionar-users.component';


interface Message {
  profilePicture?: string;
  pregunta: string;
  respuesta: string;
  origen: 'usuario' | 'bot';
}

@Component({
  selector: 'app-chatback-wt',
  templateUrl: './chatback-wt.component.html',
  styleUrl: './chatback-wt.component.scss'
})
export class ChatbackWtComponent {

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
    private QServiceWT: QuerywtService,
    private SServiceWt: SubcategoryWtService,
    private CServiceWt: CategoryWtService
  ) {}

  ngOnInit(): void {
    this.obtenerCategorias();
    if (this.categories.length > 0) {
      this.obtenerSubcategoriasPorCategoria(this.categories[0]._id);
    }
    this.showWelcomeMessage();
  }

  obtenerCategorias() {
    this.CServiceWt.showCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error obteniendo categorías:', error);
      }
    );
  }

  obtenerSubcategoriasPorCategoria(categoriaId: string) {
    this.SServiceWt.getSubcategoryByCategory(categoriaId).subscribe(
      (data) => {
        this.subcategories = data;
      },
      (error) => {
        console.error('Error obteniendo subcategorías:', error);
      }
    );
  }

  onCategoryChange() {
    this.subcategory = '';
    this.obtenerSubcategoriasPorCategoria(this.category);
  }

  onSubcategoryChange() {
    this.QServiceWT.getQueriesBySubcategory(this.subcategory).subscribe(
      (data) => {
        this.queries = data;
      },
      (error) => {
        console.error('Error obteniendo consultas:', error);
      }
    );
  }

  showWelcomeMessage() {
    this.chatHistory.push({
      pregunta: '¡Hola! ¿En qué puedo ayudarte hoy? Escribe "ayuda" para poder explicarte.?',
      respuesta: '',
      profilePicture: 'assets/bot.png',
      origen: 'bot'
    });
    this.scrollToBottom();
  }

  sendMessage() {
    if (this.userInput.toLowerCase() === 'bloque') {
     
      this.chatHistory.push({
        profilePicture: 'assets/bot.png',
        pregunta: 'Con gusto te explico, el bloque es un camino para encontrar la respuesta deseada. Como inicio, tendrás que seleccionar una categoría, que es el tema principal. Luego, seleccionas la subcategoría, que es el tema central para identificar si la pregunta se refiere a un funcionamiento, explicación u otra funcionalidad. Finalmente, se muestran las preguntas relacionadas a lo seleccionado, donde encontrarás el identificador y la pregunta. Solo busca la pregunta de tu agrado y pon su identificador en la barra de búsqueda del chatbot, y el chatbot te responderá exitosamente.',
        respuesta: '¿Para qué sirve el bloque?',
        origen: 'bot'
      });
      this.scrollToBottom();
      this.userInput = ''; 
    } else if(this.userInput.toLowerCase() === 'ayuda') {
      this.chatHistory.push({
        profilePicture: 'assets/bot.png',
        pregunta: 'Con gusto te ayudo, como primera instancia tenemos un chatbot en donde puedes consultar tus dudas mediante números. ¿Cómo saber qué número necesitas?\nEn la parte izquierda se aprecia una secuencia, en donde seleccionas la categoría que es como el tema principal de la pregunta. Después, seleccionas una subcategoría que es como el tema de caracterización, es decir, si la pregunta está relacionada con la funcionalidad de la secuancia de la izquierda o una instrucción para consultar en el chatbot. Como último paso, se mostrará una tabla con todas las preguntas disponibles. Para saber su respuesta, solo pon el # en mi barra de búsqueda, y yo con gusto te responderé. Si tienes otra duda no dudes en consultar. :D',
        respuesta: '¿Como funciona el chatbot en base a funcionamiento y itulidad?',
        origen: 'bot',
      });
    }else{
      
      this.chatHistory.push({
        profilePicture: '', 
        pregunta: this.userInput,
        respuesta: '',
        origen: 'usuario'
      });

 
      this.getQuery();
      this.userInput = ''; 
    }
  }

  getQuery() {
    const userInputLower = this.userInput.toLowerCase();

    this.QServiceWT.getQueryByNumber(userInputLower).subscribe(
      (response) => {
        if (response.status === 200) {
          const query = response.data;
          this.chatHistory.push({
            profilePicture: 'assets/bot.png',
            pregunta: query.answer,
            respuesta: query.question,
            origen: 'bot'
          });
        } else {
          this.chatHistory.push({
            profilePicture: 'assets/bot.png',
            pregunta: 'No se encontró ninguna consulta con ese identificador.',
            respuesta: '',
            origen: 'bot'
          });
        }
        this.scrollToBottom();
      },
      (error) => {
        console.error(error);
        this.chatHistory.push({
          profilePicture: 'assets/bot.png',
          pregunta: 'Ocurrió un error al obtener la consulta. Por favor, inténtelo de nuevo.',
          respuesta: '',
          origen: 'bot'
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
      origen: 'bot'
    });
    this.scrollToBottom();
  }

  openModal() {
    //cambiar aqui
    const modalRef = this.modalService.open(SeleccionarUsersComponent, { size: 'lg' });
  }

  cerrarModal() {
    this.activeModal.close('Modal cerrado');
  }

  scrollToBottom() {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
