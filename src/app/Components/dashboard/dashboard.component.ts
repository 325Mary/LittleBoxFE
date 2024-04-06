import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {InformesService} from "../../services/informes.service";
import { SolicitudesService } from '../../services/solicitudes.service';
import { forkJoin } from 'rxjs';
import Chart from 'chart.js/auto';
import { Solicitud } from '../../interfaces/solicitud';
import { filter } from 'rxjs/operators';
import { Subscription, interval } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NotificationService } from '../../services/notification.service';



interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  terceros: any[] = [];
  categorias: any[] = [];
  cols: Column[] = [];
  filtroSeleccionado: string = 'mes'; // Valor predeterminado para el filtro
  valorFiltro: any; // Valor seleccionado por el usuario para el filtro
  @ViewChild('tercerosChart') private chartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('categoriasChart') private categoriasChartRef!: ElementRef<HTMLCanvasElement>;

  fechaInicio = new Date();
  fechaFin = new Date();
  listSolicitudes: Solicitud[] = [];
  tenantId: string = '';
  documento = ""
  saldoCaja: number = 0;


  notifications: any[] = [];
  previousNotifications: any[] = [];
  notificationsCount: number = 0;
  initialNotificationCount = 10; // Define el número inicial de notificaciones a mostrar
  visibleNotifications: any[] = [];
  showLoadMoreLink: boolean = true; // Variable de control para mostrar u ocultar el enlace "Mostrar más"

  subscription: Subscription = new Subscription();
  routerSubscription: Subscription = new Subscription();

  private chart: any;

  constructor(private informesService: InformesService,
    private solicitudesService: SolicitudesService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
//notificacion
this.refreshNotifications();
this.subscription = interval(30000).subscribe(() => {
  this.refreshNotifications();
});
     // Obtener la fecha actual
  const today = new Date();
  // Establecer la fecha de inicio como el primer día del mes actual
  this.fechaInicio = new Date(today.getFullYear(), today.getMonth(), 1);
  // Establecer la fecha de fin como la fecha actual
  this.fechaFin = new Date();
  
    this.obtenerTercerosMasUtilizados()
    this.obtenerCategroiasMasUtilizados()
    this.getListSolicitudes()
  }

  obtenerTercerosMasUtilizados(): void {
    this.informesService.getTerceros('tenantId').subscribe(
    data => {
      this.terceros = data;
      this.createLineChartTer();
    },
    error => {
      console.error('Error al obtener terceros:', error);
      // Manejo de errores
    }
  );
  }

  obtenerCategroiasMasUtilizados(): void {
    this.informesService.getCategorias('tenantId').subscribe(
    data => {
      this.categorias = data;
      this.createLineChartCate();
    },
    error => {
      console.error('Error al obtener categorias:', error);
      // Manejo de errores
    }
  );
  }


  createLineChartTer(): void {
    const canvas: HTMLCanvasElement = this.chartRef.nativeElement;
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      console.error('No se pudo obtener el contexto del lienzo');
      return;
    }
  
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.terceros.map(tercero => tercero.terceroNombre),
        datasets: [{
          label: 'Cantidad de Terceros',
          data: this.terceros.map(tercero => tercero.count),
          backgroundColor: 'rgba(0, 0, 139, 0.2)',
          borderColor: 'green', // Cambiar el color a verde
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true // Aquí se especifica el tipo de escala como 'linear'
          }
        }
      }
    });
  }
  
  createLineChartCate(): void {
    const canvas: HTMLCanvasElement = this.categoriasChartRef.nativeElement; // Cambia la referencia de lienzo
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      console.error('No se pudo obtener el contexto del lienzo');
      return;
    }
  
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.categorias.map(categoria => categoria.categoriaNombre),
        datasets: [{
          label: 'Cantidad de Categorias',
          data: this.categorias.map(categoria => categoria.count),
          backgroundColor: 'rgba(0, 0, 139, 0.2)',
          borderColor: 'green', // Cambiar el color a verde
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  

  getListSolicitudes(): void {
    
    if (!this.fechaInicio || !this.fechaFin) {
      return;
    }
    this.solicitudesService
      .getListaSolicitudes(this.tenantId, this.fechaInicio, this.fechaFin, this.documento)
      .subscribe((data: any) => {
        console.log("estas son las solicitudes: ", data);
        console.log('fechast',this.fechaInicio,this.fechaFin)
        this.listSolicitudes = [...data.data];
        // this.loading = false;
        console.log("estado: ", this.listSolicitudes);
        console.log("Datos de las solicitudes: ", this.listSolicitudes);
      });
  }
  getColorByEstado(estado: string | undefined): string {
    switch (estado) {
      case 'pendiente':
        return 'orange'; // color naranja
      case 'aprobado':
        return 'blue'; // color azul
      case 'finalizado':
        return 'green'; // color verde
      case 'rechazado':
        return 'red'; // color rojo
      default:
        return ''; // color predeterminado o ninguno
    }
  }
  
 
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  refreshNotifications(): void {
    this.notificationService.getNotificationsByUserId().subscribe(
      (notifications) => {
        const unreadNotifications = notifications.filter(notification => !notification.read);
        // Mostrar solo las primeras 5 notificaciones no leídas
        this.visibleNotifications = unreadNotifications.slice(0, 5);
        // Determinar si se deben mostrar más notificaciones
        this.showLoadMoreLink = unreadNotifications.length > 5;
      },
      (error) => {
        console.error('Error al obtener las notificaciones:', error);
      }
    );
  }
  

  loadMoreNotifications() {
    // Añadir 10 notificaciones adicionales a las visibles
    const startIndex = this.visibleNotifications.length;
    const endIndex = startIndex + this.initialNotificationCount;
    this.visibleNotifications = [...this.visibleNotifications, ...this.notifications.slice(startIndex, endIndex)];
    // Ocultar el enlace "Mostrar más" si no hay más notificaciones para mostrar
    if (this.visibleNotifications.length >= this.notifications.length) {
      this.showLoadMoreLink = false;
    }
  }

  getNewNotifications(notifications: any[]): any[] {
    return notifications.filter(notification => !this.previousNotifications.includes(notification));
  }

  handleClickNotification(notificationId: string) {
    this.notificationService.markNotificationAsRead(notificationId)
      .subscribe(() => {
        // Realiza alguna acción adicional si es necesario, como actualizar la lista de notificaciones
      }, error => {
        console.error('Error al marcar la notificación como leída:', error);
      });
  }
 

  obtenerSaldoCaja(): void {
    const datos = {
      // Pasa los datos necesarios para obtener el saldo de caja, si es necesario
    };

    this.informesService.obtenerMovimientoCaja(datos).subscribe(
      (response: any) => {
        // Aquí accedes al saldo final del objeto de respuesta y lo asignas a la propiedad saldoCaja
        this.saldoCaja = response.saldoFinal;
        console.log('saldo:', this.saldoCaja)
      },
      (error: any) => {
        console.error('Error al obtener el saldo de caja:', error);
        // Manejo de errores
      }
    );
  }

  getIconByCategory(nombre: string | undefined): string {
    if (nombre) {
      // Aquí puedes asignar un ícono específico para cada categoría
      switch (nombre) {
        case 'Cafetería':
          return 'pi pi-coffee'; // Ejemplo: ícono de una taza de café de PrimeNG
        case 'Restaurante':
          return 'pi pi-cutlery'; // Ejemplo: ícono de cubiertos de PrimeNG
        case 'Transporte':
        return 'pi pi-car';
        case 'Papelería':
          return 'pi pi-book';
        // Agrega más casos según las categorías que tengas
        default:
          return 'pi pi-question-circle'; // Ícono predeterminado para categorías desconocidas
      }
    } else {
      // Manejar el caso en que categoryName sea undefined
      return 'pi pi-question-circle'; // Ícono predeterminado para categorías indefinidas
    }
  }
  
  
}