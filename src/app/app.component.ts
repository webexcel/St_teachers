import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { setTheme } from 'ngx-bootstrap/utils';
import { environment } from '../environments/environment';
import { AuthService } from './service/auth.service';
import { DataService } from './service/data.service';
import { FilesService } from './service/files.service';
import { LoadingService } from './service/loading.service';
import { StorageService } from './service/storage.service';
import { TranslateConfigService } from './service/translate-config.service';
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
  public appPages: any;
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
    public authservice: AuthService,
    public alertCtrl: AlertController
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

    // this.storage.addjson('teachersDetail', [
    //   {
    //     UserId: '57',
    //     firstname: 'School Tree Demo',
    //     staff_id: '1',
    //     Is_Admin: 'Y',
    //     DisplayName: 'App Test',
    //     dbname: 'demosch',
    //   },
    //   {
    //     UserId: '7',
    //     firstname: 'Schooltree Demo Account',
    //     staff_id: '0',
    //     Is_Admin: 'Y',
    //     DisplayName: 'demo schooltree',
    //     dbname: 'schooltree',
    //   },
    // ]);

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
        }
      );

      this.dataservice.changeMenustatus(true);
    } else {
      this.dataservice.changeMenustatus(false);
    }
  }

  async ionViewWillEnter() {
    this.appPages = await this.storage.getjson('menulist');
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
    this.storage.add('push', 'ok'); // this line ok
    this.notif.initPush();
  }

  async logout() {
    let alert = await this.alertCtrl.create({
      header: 'SchoolTree',
      message: 'Do you want to log-out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (data) => {
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
          },
        },
      ],
    });
    await alert.present();
  }
}
