import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Badge } from '@ionic-native/badge/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AlertController } from '@ionic/angular';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  token: any;
  public fireBaseRegistrationID: any;
  public badgeNumber: any;
  constructor(
    private storage: StorageService,
    public router: Router,
    private badge: Badge,
    private nativeAudio: NativeAudio,
    public alertCtrl: AlertController
  ) {}
  initPush() {
    console.log('inti pushh');
    this.badge.set(this.badgeNumber);
    if (Capacitor.getPlatform() !== 'web') {
      this.registerPush();
    }
    // this.registerPush();
  }
  // private registerPush() {
  //     PushNotifications.requestPermissions().then(permission => {
  //         if (permission.receive === 'granted') {
  //             PushNotifications.register();
  //         }
  //         else {
  //             // If permission is not granted
  //         }
  //     });
  //     PushNotifications.addListener('registration', (token) => {
  //       console.log(token);
  //       this.token=token;
  //       alert('FCM Token: '+token);
  //     });
  //     PushNotifications.addListener('registrationError', (err)=> {
  //         console.log(err);
  //     });
  //     PushNotifications.addListener('pushNotificationReceived', (notifications) => {
  //         console.log(notifications);
  //         alert('New notification: '+notifications);
  //     });

  // }

  private registerPush() {
    PushNotifications.requestPermissions().then((permission) => {
      if (permission.receive === 'granted') {
        PushNotifications.register();
      } else {
        // If permission is not granted
      }
    });

    PushNotifications.addListener('registration', (token) => {
      this.storage.add('push1', 'ok1');
      console.log('FCM Token:', token.value);
      this.fireBaseRegistrationID = token.value;
      //TODO - save in local storage
      this.storage.add('fireBaseID', this.fireBaseRegistrationID); // this line has to work??
      console.log('Device registered ID', this.fireBaseRegistrationID);
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification) => {
        console.log('Push Notification Received:', notification);
        this.badge.set(this.badgeNumber);
        console.log('Default Badge Number', this.badgeNumber);
        this.badge.increase(1);
        console.log('After Increase Badge Number', this.badgeNumber);
        if (notification.data.foreground) {
          // App is in foreground, show popup
          this.badge.set(this.badgeNumber);
          console.log('notification.additionalData.foreground');
          this.alertopen(notification);
          this.nativeAudio.play('uniqueId1').then(
            (res) => {
              console.log(res);
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          // App is in background or closed, handle notification click
          console.log('Push notification clicked');
          this.alertopen(notification);
        }
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (action: any) => {
        console.log('Push Notification Action Performed:', action);
      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Registration Error:', error);
    });
  }

  async alertopen(notification: any) {
    let confirmAlert = await this.alertCtrl.create({
      header: 'New Notification',
      message: notification.additionalData.id,
      buttons: [
        {
          text: 'Ignore',
          role: 'cancel',
        },
        {
          text: 'View',
          handler: () => {
            this.router.navigate(['circulars']);
          },
        },
      ],
    });
    confirmAlert.present();
  }
}
