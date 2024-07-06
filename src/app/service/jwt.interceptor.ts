import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AlertController, ToastController } from '@ionic/angular';
import { finalize, tap } from 'rxjs/operators';
import { TranslateConfigService } from '../service/translate-config.service';

import { Observable, fromEvent, merge, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  cancel: any;
  public appIsOnline$!: Observable<boolean>;
  constructor(
    public alertCtrl: AlertController,
    private translate: TranslateConfigService,
    private toastController: ToastController
  ) {
    this.translate.getparam('cancel').then((v: any) => (this.cancel = v));
    this.initConnectivityMonitoring();
  }

  private initConnectivityMonitoring() {
    if (!window || !navigator || !('onLine' in navigator)) return;

    this.appIsOnline$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    ).pipe(map(() => navigator.onLine));
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let u: any = request.url;
    if (u) {
      u = u.split('api/');
      if (u.length == 2) {
        u = u[1].split('/');
        if (u.length == 2) {
          u = u[0];
        }
      }
    }
    return next.handle(request).pipe(
      tap(
        (r: any) => {
          r = r['body'];
          try {
            if (r['status'] !== undefined) {
              if (!r['status']) {
                if (u != 'getteacherflashmessage') {
                  this.getmsg(r);
                }
              }
            }
          } catch (error) {
            try {
              if (r['STATUS'] != undefined) {
                if (!r['STATUS']) {
                  if (u != 'getteacherflashmessage') {
                    this.getmsg(r);
                  }
                }
              }
            } catch (error) { }
          }
        },
        (error: any) => {
          if (error['statusText'] == 'Unknown Error') {
            this.appIsOnline$.subscribe((res) => {
              if (!res) {
                this.show('Please Check Your Internet Connection');
              } else {
                this.show('Contact Support Team');
              }
            });
          } else {
            this.show('Contact Support Team');
          }
        }
      ),
      finalize(() => { })
    );
  }

  getmsg(r: any) {
    if (r['message'] != undefined) {
      this.show(r['message']);
    }
    if (r['MESSAGE'] != undefined) {
      this.show(r['MESSAGE']);
    }
  }

  async show(msg: any) {
    if (msg.includes("Contact Support")) {
      const toast = await this.toastController.create({
        message: msg + "!!",
        duration: 2000,
        color: "danger",
        position: 'middle'
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: msg,
        duration: 2000,
        color: "success",
        position: 'middle'
      });
      toast.present();
    }
    // let alert = await this.alertCtrl.create({
    //   header: msg,
    //   buttons: [
    //     {
    //       text: this.cancel,
    //       role: 'cancel',
    //       handler: (data) => { },
    //     },
    //   ],
    // });
    // await alert.present();
  }
}
