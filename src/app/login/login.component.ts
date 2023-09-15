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
    this.authservice.post('userLogin', value).subscribe(
      (result: any) => {
        this.loading.dismissAll();
        if (result['status']) {
          if (result['data'].length > 0) {
            this.teachersDetail = result['data'];
            this.storage.addjson('teachersDetail', result['data']);

            this.mobileinstall();
          }
        }
      },
      (err) => {
        this.loading.dismissAll();
      }
    );
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
        console.log(err);
      }
    );
  }

  updateFireBaseID() {
    let fireBaseIDValues = this.storage.get('fireBaseID');
    let sendingValue = {
      firebase_id: fireBaseIDValues,
      staff_id: this.teachersDetail[0]['staff_id'],
    };
    this.authservice.post('updateFirebaseId', sendingValue).subscribe(
      (result: any) => {
        if (result['status']) {
          this.getClass();
        } else {
          this.loading.dismissAll();
        }
      },
      (err) => {
        this.loading.dismissAll();
        //Connection failed message
      }
    );
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
}
