import { Component, Input } from '@angular/core';
import { QueriesService } from '../../../services/chatbot/queries.service';
import { SubcategoryService } from '../../../services/chatbot/subcategory.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from '../menu/menu.component';


interface Message {
  pregunta: string;
  respuesta: string;
  fotoPerfil?: string;
  origen: 'usuario' | 'bot';
}

interface Category {
  referencia: string;
  nombre: string;
  descripcion: string;
}
 
@Component({
  selector: 'app-chatbody',
  templateUrl: './chatbody.component.html',
  styleUrl: './chatbody.component.scss'
})


export class ChatbodyComponent {


  userInput: string = '';
  chatHistory: Message[] = [];
  categories: Category[] = [];

  constructor(private QService: QueriesService, 
    private modalService: NgbModal,
    public activeModal: NgbActiveModal) 
  {}

  //Configuracion:
  openModal() {
    const modalRef = this.modalService.open( MenuComponent, { size: 'lg' });
  }

  cerrarModal() {
    this.activeModal.close('Modal cerrada');
  }

  //Componente:
  ngOnInit(): void {
    this.mostrarMensajeBienvenida();
  }

  mostrarMensajeBienvenida() {
    this.chatHistory.push({
      pregunta: '¡Bienvenido! ¿En qué puedo ayudarte? Escribe "Help" para ver las categorías.',
      respuesta: '',
      fotoPerfil: 'assets/bot.png',
      origen: 'bot'
    });
  }

  enviarMensaje() {
    const userInputLower = this.userInput.toLowerCase();

    if (userInputLower === 'help') {

      this.consultarPorReferencia(userInputLower);
    } else {
      this.mostrarMensajeNoEntendido();
    }

    this.userInput = '';
  }

  consultarPorReferencia(indentifier: string) {
    const indentifierQ = indentifier;
    this.QService.getConsultationIdentifier(indentifierQ).subscribe(
      (query) => {
        if (query) {
          this.chatHistory.push({
            pregunta: query.pregunta,
            respuesta: query.respuesta,
            fotoPerfil: 'assets/bot.png',
            origen: 'bot'
          });
        } else {
          this.chatHistory.push({
            pregunta: 'No se encontró ninguna consulta con esa referencia.',
            respuesta: '',
            fotoPerfil: 'assets/bot.png',
            origen: 'bot'
          });
        }
      },
      (error) => {
        console.error(error);
        this.chatHistory.push({
          pregunta: 'Ocurrió un error al obtener la consulta. Por favor, inténtalo de nuevo.',
          respuesta: '',
          fotoPerfil: 'assets/bot.png',
          origen: 'bot'
        });
      }
    );
  }

  mostrarMensajeNoEntendido() {
    this.chatHistory.push({
      pregunta: this.userInput,
      respuesta: 'No entiendo. Escribe "Help" para obtener ayuda.',
      fotoPerfil: 'assets/bot.png',
      origen: 'bot'
    });
  }

}
