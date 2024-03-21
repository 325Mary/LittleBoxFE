import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { TokenValidationService } from '../services/token-validation-service.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesPushService {
  private myAppUrl: string;
  private fcmServerKey: string; // Clave del servidor de FCM, obtenida desde la consola de Firebase
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiUrl;
    this.fcmServerKey = environment.firebaseConfig.fcmServerKey; // Ajusta según tu clave del servidor de FCM
    if (!('serviceWorker' in navigator)) {
      console.warn("Service Worker isn't supported on this browser.");
    }
    if (!('PushManager' in window)) {
      console.warn("Push isn't supported on this browser.");
    }
  }

  // askPermission() {
  //   return new Promise((resolve, reject) => {
  //     const permissionResult = Notification.requestPermission((result) => {
  //       resolve(result);
  //     });
  
  //     if (permissionResult) {
  //       permissionResult.then(resolve, reject);
  //     }
  //   }).then((permissionResult) => {
  //     if (permissionResult !== 'granted') {
  //       throw new Error("We weren't granted permission.");
  //     }
  //   });
  // }

  askPermission(): Promise<NotificationPermission> {
    return new Promise((resolve, reject) => {
      const permissionResult = Notification.requestPermission((result) => {
        resolve(result);
      });

      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    });
  }

  
  subscribeUserToPush(): Promise<PushSubscription> {
    return navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(
            'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U',
          ),
        };
        return registration.pushManager.subscribe(subscribeOptions);
      })
      .then(pushSubscription => {
        console.log('Received PushSubscription:', pushSubscription);
        return pushSubscription;
      });
  }

  // sendNotificationToUser(pushSubscription: PushSubscription, message: string): void {
  //   // Aquí puedes enviar una notificación push al usuario utilizando la PushSubscription y el mensaje proporcionados
  //   // Esto puede requerir una integración con un servicio de envío de notificaciones push
  // }

  sendNotificationToUser(pushSubscription: PushSubscription, message: string): void {
    const notificationPayload = {
      notification: {
        title: 'Título de la notificación',
        body: message
      },
      subscription: pushSubscription
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `key=${this.fcmServerKey}`
    });

    this.http.post('https://fcm.googleapis.com/fcm/send', notificationPayload, { headers })
      .subscribe(
        response => {
          console.log('Notificación enviada con éxito:', response);
        },
        error => {
          console.error('Error al enviar la notificación:', error);
        }
      );
  }


  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    // Esta función convierte una cadena base64 en un array de bytes
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  
  // sendSubscriptionToBackend(pushSubscription: PushSubscription): Promise<any> {
  //   const subscriptionObject = {
  //     endpoint: pushSubscription.endpoint,
  //     keys: {
  //       p256dh: pushSubscription.getKey('p256dh'),
  //       auth: pushSubscription.getKey('auth')
  //     }
  //   };

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //   return this.http.post('/api/save-subscription/', subscriptionObject, { headers })
  //     .toPromise()
  //     .then(response => {
  //       console.log('Subscription successfully saved on server:', response);
  //     })
  //     .catch(error => {
  //       console.error('Error saving subscription:', error);
  //       throw error; // O maneja el error de alguna otra manera según tus necesidades
  //     });
  // }
  
  sendSubscriptionToBackend(pushSubscription: PushSubscription): Observable<any> {
    const subscriptionObject = {
      endpoint: pushSubscription.endpoint,
      keys: {
        p256dh: pushSubscription.getKey('p256dh'),
        auth: pushSubscription.getKey('auth')
      }
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.myAppUrl}/save-subscription/`, subscriptionObject, { headers });
  }

 }
