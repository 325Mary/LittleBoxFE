import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Subscription, interval } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: any[] = [];
  previousNotifications: any[] = [];
  notificationsCount: number = 0;

  subscription: Subscription = new Subscription();
  routerSubscription: Subscription = new Subscription();

  constructor(private notificationService: NotificationService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.refreshNotifications();
    this.subscription = interval(30000).subscribe(() => {
      this.refreshNotifications();
    });

    // Suscribirse a los cambios de ruta para marcar la notificación como leída
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Evento de navegación:', event);
        const notificationId = this.route.snapshot.params['notificationId'];
        if (notificationId) {
          this.markAsRead(notificationId);
          console.log('ID de notificación:', notificationId);
        }
      }
    });
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  refreshNotifications(): void {
    this.notificationService.getNotificationsByUserId().subscribe(
      (notifications) => {
        const newNotifications = this.getNewNotifications(notifications);
        if (newNotifications.length > 0) {
          this.notificationsCount += newNotifications.length;
        }
        this.notifications = notifications;
        this.previousNotifications = notifications;
      },
      (error) => {
        console.error('Error al obtener las notificaciones:', error);
      }
    );
  }
  
  getNewNotifications(notifications: any[]): any[] {
    return notifications.filter(notification => !this.previousNotifications.includes(notification));
  }
  
  markAsRead(notificationId: string): void {
    this.notificationService.markNotificationAsRead(notificationId).subscribe(
      () => {
        // Actualizar la lista de notificaciones o realizar cualquier otra acción necesaria
      },
      error => {
        console.error('Error al marcar la notificación como leída:', error);
      }
    );
  }
}
