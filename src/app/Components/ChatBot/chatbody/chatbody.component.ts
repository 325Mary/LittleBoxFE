import { Component } from '@angular/core';
import { QueriesService } from '../../../services/chatbot/queries.service';
import { SubcategoryService } from '../../../services/chatbot/subcategory.service';

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

  constructor(private QService: QueriesService, private SService: SubcategoryService) {}

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

  // mostrarCategorias() {
  //   this.QService.showQueries().subscribe(
  //     (categorias) => {
  //       this.categories = categories;
  //       const categoriesMsg = categories.map(
  //         (category: Category) => `Nombre: ${category.name}`
  //       );

  //       this.chatHistory.push({
  //         pregunta: 'Categorías disponibles:\n' + categoriesMsg.join('\n'),
  //         respuesta: '',
  //         fotoPerfil: 'assets/bot.png',
  //         origen: 'bot'
  //       });
  //     },
  //     (error) => {
  //       console.error(error);
  //       this.chatHistory.push({
  //         pregunta: 'Ocurrió un error al obtener las categorías. Por favor, inténtalo de nuevo.',
  //         respuesta: '',
  //         fotoPerfil: 'assets/bot.png',
  //         origen: 'bot'
  //       });
  //     }
  //   );
  // }

  // mostrarSubclasesPorCategoria(referenciaCategoria: string) {
  //   const categoriaSeleccionada = this.ca.find(c => c.referencia === referenciaCategoria);

  //   if (categoriaSeleccionada) {
  //     this.subclaseService.obtenerSubclasesPorCategoria(referenciaCategoria).subscribe(
  //       (subclases) => {
  //         if (subclases && subclases.length > 0) {
  //           const subclasesMsg = subclases
  //             .map((subclase: any) => `Subclase: Referencia: ${subclase.referencia}, Nombre: ${subclase.nombre}`)
  //             .join('\n');
  //           this.chatHistory.push({
  //             pregunta: `Subclases asociadas a la categoría ${referenciaCategoria} (${categoriaSeleccionada.nombre}):\n` + subclasesMsg,
  //             respuesta: '',
  //             fotoPerfil: 'assets/bot.png',
  //             origen: 'bot'
  //           });
  //         } else {
  //           this.chatHistory.push({
  //             pregunta: `No se encontraron subclases para la categoría ${referenciaCategoria}.`,
  //             respuesta: '',
  //             fotoPerfil: 'assets/bot.png',
  //             origen: 'bot'
  //           });
  //         }
  //       },
  //       (error) => {
  //         console.error(error);
  //         this.chatHistory.push({
  //           pregunta: `Ocurrió un error al obtener subclases para la categoría ${referenciaCategoria}. Por favor, inténtalo de nuevo.`,
  //           respuesta: '',
  //           fotoPerfil: 'assets/bot.png',
  //           origen: 'bot'
  //         });
  //       }
  //     );
  //   } else {
  //     this.mostrarMensajeNoEntendido(); 
  //   }
  // }

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
