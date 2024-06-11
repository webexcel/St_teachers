import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/data.service';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';
import { TranslateConfigService } from '../service/translate-config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  logo: any = environment.login_logo;
  school_name: any = environment.school_name;
  authForm: any = {};
  app_versionCode: any = environment.app_versionCode;
  usernametr: any;
  passwordtr: any;
  teachersDetail: any = [];
  storeFirBaseStatus: any;
  menuList: any;

  constructor(
    private platform: Platform,
    private appMinimize: AppMinimize,
    public loading: LoadingService,
    private translate: TranslateConfigService,
    private dataservice: DataService,
    private router: Router,
    public authservice: AuthService,
    public storage: StorageService,
    private alertCtrl: AlertController
  ) {
    this.platform.backButton.subscribe(() => {
      let p = this.storage.get('page');
      if (p == 'login') {
        this.appMinimize.minimize();
      }
    });
  }

  ngOnInit() {
    this.translate.set();
    this.translate.getparam('username').then((v) => (this.usernametr = v));
    this.translate.getparam('password').then((v) => (this.passwordtr = v));
  }

  replaceholderusername(t: any) {
    t.target.placeholder = this.usernametr;
  }

  replaceholderpassword(t: any) {
    t.target.placeholder = this.passwordtr;
  }

  async submitForm() {
    try {
      this.loading.present();
      this.app_versionCode = environment.app_versionCode;
      const info = await Device.getInfo();
      let value: any = {
        platform_type: info.platform,
        manufacturer_name: info.manufacturer,
        manufacturer_model: info.model,
        os_version: info.osVersion,
        deviceid: await Device.getId(),
        username: this.authForm.username,
        password: this.authForm.password,
        app_version_code: this.app_versionCode,
      };
      const result: any = await this.authservice
        .post('userLogin', value)
        .toPromise();
      this.loading.dismissAll();
      if (result['status'] && result['data'] && result['data'].length > 0) {
        this.teachersDetail = result['data'];
        this.storage.addjson('teachersDetail', result['data']);
        this.mobileinstall();
        //this.getimage(0);
      } else {
        // Handle case where no data is returned or data is empty
      }
    } catch (error) {
      console.error('Error occurred while submitting form:', error);
      this.loading.dismissAll();
      // Handle error appropriately (e.g., display error message)
    }
  }

  async mobileinstall() {
    this.loading.present();
    this.app_versionCode = environment.app_versionCode;
    const info = await Device.getInfo();
    let value: any = {
      platform_type: info.platform,
      manufacturer_name: info.manufacturer,
      manufacturer_model: info.model,
      os_version: info.osVersion,
      deviceid: await Device.getId(),
      staff_id: this.teachersDetail[0]['staff_id'],
      contact: this.teachersDetail[0]['contact'],
      app_version_code: this.app_versionCode,
    };
    this.authservice.post('mobileinstallsnew', value).subscribe(
      (result: any) => {
        if (result['status'] == true) {
          this.updateFireBaseID();
        } else {
          // this.openalert(this.getLoginValue.message)
        }
        this.loading.dismissAll();
      },
      (err) => {
        this.loading.dismissAll();
      }
    );
  }

  getimage(i: any) {
    if (
      this.teachersDetail &&
      this.teachersDetail.data &&
      i < this.teachersDetail.data.length
    ) {
      if (i > this.teachersDetail.data.length - 1) {
        this.storage.addjson('teachersDetail', this.teachersDetail.data);
        this.dataservice.changeMenustatus(true);
        this.storage.addjson('flashmsg', { Discription: '', event_image: '' });
        this.loading.dismissAll();
        this.router.navigate(['']);
      } else {
        if (this.teachersDetail.data[i]['ADNO'] != undefined) {
          this.authservice
            .post('getMobStudentPhoto', {
              adno: this.teachersDetail.data[i]['ADNO'],
            })
            .subscribe(
              (result: any) => {
                if (result['status']) {
                  if (result['data'] != 'data:image/jpg;base64,') {
                    this.storage.add(
                      this.teachersDetail.data[i]['ADNO'] + 'img',
                      result['data']
                    );
                    // this.getStudentDetails.data[i]["stu_img"] = result['data']
                  }
                  this.getimage(i + 1);
                }
              },
              (err) => {
                this.loading.dismissAll();
              }
            );
        } else {
          this.getimage(i + 1);
        }
      }
    }
  }

  getClass() {
    this.loading.present();
    let data = {
      Is_Admin: this.teachersDetail[0]['Is_Admin'],
      staff_id: this.teachersDetail[0]['staff_id'],
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

    this.getmenu();
  }

  getmenu() {
    this.loading.present();
    let data = {
      UserId: this.teachersDetail[0].UserId,
    };
    this.authservice.post('getMobileAppMenu', data).subscribe(
      (res: any) => {
        this.loading.dismissAll();
        if (res['status'] && res['data'].length > 0) {
          this.storage.addjson('menulist', res['data']);
        } else {
          this.storage.addjson('menulist', environment.pages);
        }
        this.dataservice.changeMenustatus(true);
        this.router.navigate(['']);
      },
      (err) => {
        this.storage.addjson('menulist', environment.pages);
        this.loading.dismissAll();
      }
    );
  }

  // getMobileAppMenu() {
  //   let detail = {
  //     UserId: this.teachersDetail.UserId,
  //   };
  //   this.loading.present();
  //   this.authservice.post('getMobileAppMenu', detail).subscribe(
  //     (result: any) => {
  //       this.loading.dismissAll();
  //     },
  //     (err) => {
  //       this.loading.dismissAll();
  //       //Connection failed message
  //     }
  //   );
  // }

  updateFireBaseID() {
    let fireBaseIDValues = this.storage.get('fireBaseID');
    let sendingValue = {
      firebase_id: fireBaseIDValues,
      staff_id: this.teachersDetail[0]['staff_id'],
      contact: this.teachersDetail[0]['contact'],
    };
    this.authservice.post('updateFirebaseId', sendingValue).subscribe(
      (result: any) => {
        let fireBaseResponse = result;
        this.storeFirBaseStatus = fireBaseResponse;
        if (this.storeFirBaseStatus.status) {
          this.getClass();
        } else {
          this.loading.dismissAll();
          this.openalert('FIRE BASE ALERT', this.storeFirBaseStatus.data);
        }
      },
      (err) => {
        this.loading.dismissAll();
        //Connection failed message
      }
    );
  }

  async openalert(message: any, title = 'ALERT') {
    let alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
