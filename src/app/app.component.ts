import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { StorageService } from './service/storage.service';

import { Router } from '@angular/router';
import { setTheme } from 'ngx-bootstrap/utils';
import { environment } from '../environments/environment';
import { DataService } from './service/data.service';
import { TranslateConfigService } from './service/translate-config.service';

import { AuthService } from './service/auth.service';
import { FilesService } from './service/files.service';
import { LoadingService } from './service/loading.service';
// import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { Badge } from '@ionic-native/badge/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { register } from 'swiper/element/bundle';
import { NotificationsService } from './service/notifications.service';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  ios: any = false;
  public fireBaseRegistrationID: any;
  public getStudentDetails: any = [];
  public app_versionCode: any;
  public storeValues: any;
  public sName: any;
  public badgeNumber: number | undefined;
  public disPlayStudentDetail: any = [];
  public index: any = false;
  public appPages = environment.pages;
  loadingconfig: any = {
    bgsColor: environment.color,
    bgsOpacity: 0.5,
    bgsPosition: 'bottom-right',
    bgsSize: 60,
    bgsType: 'ball-spin-clockwise',
    blur: 5,
    delay: 0,
    fastFadeOut: true,
    fgsColor: environment.color,
    fgsPosition: 'center-center',
    fgsSize: 60,
    fgsType: 'cube-grid',
    gap: 24,
    logoPosition: 'center-center',
    logoSize: 120,
    logoUrl: '',
    masterLoaderId: 'master',
    overlayBorderRadius: '0',
    overlayColor: 'rgba(40, 40, 40, 0.8)',
    pbColor: environment.color,
    pbDirection: 'ltr',
    pbThickness: 3,
    hasProgressBar: false,
    text: 'Please wait',
    textColor: '#FFFFFF',
    textPosition: 'center-center',
    maxTime: -1,
    minTime: 300,
  };
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    public notif: NotificationsService,
    private nativeAudio: NativeAudio,
    private badge: Badge,
    private serfile: FilesService,
    public loading: LoadingService,
    private translate: TranslateConfigService,
    private dataservice: DataService,
    public router: Router,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private storage: StorageService,
    public authservice: AuthService
  ) {
    setTheme('bs4');
    router.events.subscribe((val) => {
      this.storage.remove('page');
      switch (router.url.replace('/', '')) {
        case 'dashboard':
          this.storage.addjson('flashmsg', {});
          this.storage.add('page', 'dashboard');
          break;
        case 'login':
          this.storage.add('page', 'login');
          break;
        default:
          this.storage.remove('page');
      }
    });
    // this.platform.backButton.subscribe(() => {
    //   this.appMinimize.minimize();
    // })

    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      //this.checkfile();
      this.pushSetup();
      this.splashScreen.hide();
      this.ios = this.authservice.isiso();
      this.serfile.checkdir();
    });

    this.dataservice.currentMenustatus.subscribe((index) => {
      this.index = index;
      this.translate.set();
      this.translate
        .getparam('loader_msg')
        .then((v) => (this.loadingconfig.text = v));
    });

    // this.dataservice.changeMenustatus(true)

    this.disPlayStudentDetail = this.storage.getjson('teachersDetail');
    if (this.disPlayStudentDetail) {
      this.loading.present();
      let data = {
        Is_Admin: this.disPlayStudentDetail[0]['Is_Admin'],
        staff_id: this.disPlayStudentDetail[0]['staff_id'],
      };
      this.authservice.post('getclass', data).subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.storage.addjson('classlist', res['data']);
          } else {
            this.storage.addjson('classlist', []);
          }
          this.dataservice.changeMenustatus(true);
          this.router.navigate(['']);
        },
        (err) => {
          this.storage.addjson('classlist', []);
          this.loading.dismissAll();
          console.log(err);
        }
      );

      this.dataservice.changeMenustatus(true);
    } else {
      this.dataservice.changeMenustatus(false);
    }
  }

  checkview(v: any) {
    if (v == 'Y') {
      if (this.storage.getjson('teachersDetail')[0]['Is_Admin'] == 'Y') {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  async pushSetup() {
    // const options: PushOptions = {
    //   android: {
    //     senderID: environment.senderID,
    //     sound: 'true'
    //   },
    //   ios: {
    //     alert: 'true',
    //     badge: true,
    //     sound: 'false'
    //   }
    // };

    //const browser = this.iab.create('https://ionicframework.com/');

    // const pushObject: PushObject = this.push.init(options);
    this.storage.add('push', 'ok'); // this line ok

    this.notif.initPush();

    // pushObject.on('registration').subscribe((registration: any) => {
    //   this.fireBaseRegistrationID = registration.registrationId
    //   //TODO - save in local storage
    //   this.storage.add('fireBaseID',this.fireBaseRegistrationID)
    //   console.log('Device registered ID', this.fireBaseRegistrationID);
    // });

    // pushObject.on('notification').subscribe((notification: any) => {

    //   console.log('Received aa notification', notification)
    //   ///// Acknowledge the notification//////////
    //   console.log('Receivedd notification', notification.additionalData.id);
    //   ///// Acknowledge Ends//////////

    //   this.badge.set(this.badgeNumber);
    //   console.log('Default Badge Number', this.badgeNumber);
    //   this.badge.increase(1);
    //   console.log('After Increase Badge Number', this.badgeNumber);
    //   //if user using app and push notification comes
    //   if (notification.additionalData.foreground) {
    //     // if application open, show popup
    //     this.badge.set(this.badgeNumber);
    //     console.log('notification.additionalData.foreground')

    //     this.nativeAudio.play('uniqueId1').then((res:any)=>{
    //       console.log(res)
    //     },(err:any)=>{
    //       console.log(err)
    //     })
    //   }
    //   else {
    //     //if user NOT using app and push notification comes
    //     //TODO: Your logic on click of push notification directly
    //     console.log('Push notification clicked');

    //   }
    // });
    // //  this.badgeNumber++;
    // pushObject.on('error').subscribe((error:any) => console.error('Error with Push plugin', error));
  }

  logout() {
    let laun = this.storage.get('laun');
    let fireBaseID = this.storage.get('fireBaseID');
    this.storage.clear();
    if (laun) {
      this.storage.add('laun', laun);
      this.translate.set();
    }
    this.storage.add('fireBaseID', fireBaseID);
    this.index = false;
    this.router.navigate(['login']);
  }
}
