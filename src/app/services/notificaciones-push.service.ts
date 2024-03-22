import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { getToken, getMessaging, Messaging } from "@angular/fire/messaging";
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NotificacionesPushService {
  private myAppUrl: string;
  private fcmServerKey: string; // Clave del servidor de FCM, obtenida desde la consola de Firebase
  

  constructor(private swPush: SwPush, private http: HttpClient) {
    this.myAppUrl = environment.apiUrl;
    this.fcmServerKey = 'TU_CLAVE_DEL_SERVIDOR_DE_FCM'; // Ajusta según tu clave del servidor de FCM
    if (!('PushManager' in window)) {
      console.warn("Push isn't supported on this browser.");
    }
  }

  askPermission(): Promise<NotificationPermission> {
    return Notification.requestPermission();
  }

  async requestPermision(){
    const messaging =  getMessaging()
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        const token = await getToken(messaging, {vapidKey: 'BHOXMQkF97UR4ssSnlRqpQ1KOyX9bLWrHGyzP1fpOD0rvsTca6NBBvnr6QuyyfmPm7hg-AvbC1CkNfP3QZKrATc'})
        console.log(token);
        // ... (Optional) send the token tovyou backend to associate it whit the user
      } else {
        console.log('Unable to get permission to notify');
        
      }
    } catch (error) {
      console.error('Unable to get permission to notify.', error);
      
    }
  }

  subscribeUserToPush(): Promise<PushSubscription> {
    return this.swPush.requestSubscription({
      serverPublicKey: 'LLAVE_PUBLICA_DE_TU_SERVIDOR_DE_APLICACIONES'
    });
  }

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

    // Aquí puedes enviar la notificación al servidor de Firebase Cloud Messaging
    // Para esta implementación, se asume que se utiliza Firebase Cloud Messaging (FCM)
    // y la clave del servidor de FCM se utiliza para autorizar la solicitud.
    // Ajusta esto según la configuración de tu servidor de notificaciones.
  }

  sendSubscriptionToBackend(pushSubscription: PushSubscription): Observable<any> {

    const subscriptionObject = {
      endpoint: pushSubscription.endpoint,
      keys: {
        p256dh: this.encode(pushSubscription.getKey('p256dh')!),
        auth: this.encode(pushSubscription.getKey('auth')!)
      }
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.myAppUrl}"/save-subscription/"`, subscriptionObject, { headers });
    
  }

  private encode(value: ArrayBuffer): string {
    const uintArray = new Uint8Array(value); // Convierte el ArrayBuffer a un Uint8Array
    const array = Array.from(uintArray); // Convierte el Uint8Array a un arreglo de números
    return btoa(String.fromCharCode.apply(null, array)); // Convierte los números a una cadena codificada en base64
}


}
