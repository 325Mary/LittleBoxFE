import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from '../menu/menu.component';
import { QueriesService } from '../../../services/chatbot/queries.service';
import { SubcategoryService } from '../../../services/chatbot/subcategory.service';
import { CategoryService } from '../../../services/chatbot/category.service';


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
  userInput: string = '';
  chatHistory: Message[] = [];

  category: string = '';
  subcategory: string = ''; 
  categories: any[] = [];
  subcategories: any[] = []; 
  queries: any [] = []

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private QService: QueriesService,
    private SService: SubcategoryService,
    private CService: CategoryService
  ) {}

  ngOnInit(): void {
    this.obtenerCategorias();
    if (this.categories.length > 0) {
      this.obtenerSubcategoriasPorCategoria(this.categories[0]._id);
    }
    this.showWelcomeMessage();
  }
  
  obtenerCategorias() {
    this.CService.showCategories().subscribe(
      (data) => {
        this.categories = data; 
      },
      (error) => {
        console.error('Error obteniendo categorías:', error);
      }
    );
  }

  obtenerSubcategoriasPorCategoria(categoriaId: string) {
    this.SService.getSubcategoryByCategory(categoriaId).subscribe(
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
    this.QService.getQueriesBySubcategory(this.subcategory).subscribe(
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
      pregunta: '¡Hola! ¿En qué puedo ayudarte hoy? Escribe "Ayuda" para poder explicarte.?',
      respuesta: '',
      profilePicture: 'assets/bot.png',
      origen: 'bot'
    });
  }

  sendMessage() {
    this.getQuery();
    this.userInput = '';
  }

  getQuery() {
    const userInputLower = this.userInput.toLowerCase();

    this.QService.getQueryIdentifier(userInputLower).subscribe(
      (response) => {
        if (response.status === 200) {
          const query = response.data;
          this.chatHistory.push({
            profilePicture: 'assets/bot.png',
            pregunta: query.question,
            respuesta: query.answer,
            origen: 'bot'
          });
        } else {
          this.chatHistory.push({
            pregunta: 'No query found with that identifier.',
            respuesta: '',
            profilePicture: 'assets/bot.png',
            origen: 'bot'
          });
        }
      },
      (error) => {
        console.error(error);
        this.chatHistory.push({
          pregunta: 'An error occurred while fetching the query. Please try again.',
          respuesta: '',
          profilePicture: 'assets/bot.png',
          origen: 'bot'
        });
      }
    );
  }

  showUnknownMessage() {
    this.chatHistory.push({
      pregunta: this.userInput,
      respuesta: 'I do not understand.',
      profilePicture: 'assets/bot.png',
      origen: 'bot'
    });
  }

  openModal() {
    const modalRef = this.modalService.open(MenuComponent, { size: 'lg' });
  }

  cerrarModal() {
    this.activeModal.close('Modal closed');
  }
}
