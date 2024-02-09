import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AlertController, IonModal, Platform } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';
import { TranslateConfigService } from '../service/translate-config.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent implements OnInit {
  ios: any = false;
  @ViewChild('portComponent', { static: false }) portComponent: any;
  timetable: any;
  classs: any = [];
  students: any = [];
  select_datas: any = {};
  select_datas1: any = {};
  delete_attendance: any;
  cancel: any;
  send_attendance: any;
  send: any;
  delete: any;
  showDatePicker: boolean = false;
  @ViewChild(IonModal)
  modal!: IonModal;
  isPickerOpen: boolean = false;

  currentOrientation: any;
  orientationChange: any;
  data: any = [];
  day: any = [];
  subject: any = [];
  keys: any = [];
  show: any = false;

  constructor(
    public alertCtrl: AlertController,
    private platform: Platform,
    private router: Router,
    private translate: TranslateConfigService,
    public loading: LoadingService,
    public authservice: AuthService,
    private screenOrientation: ScreenOrientation,
    public storage: StorageService
  ) {
    this.currentOrientation = this.screenOrientation.type;
    this.platform.backButton.subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  ngOnInit() {
    this.ios = this.authservice.isiso();
    this.translate.set();

    // Check if screen orientation lock is supported
    if (this.screenOrientation && this.screenOrientation.lock) {
      try {
        this.screenOrientation.lock(
          this.screenOrientation.ORIENTATIONS.LANDSCAPE
        );
      } catch (error) {
        console.error('Error locking screen orientation:', error);
      }
    } else {
      console.warn('Screen orientation lock not supported on this device.');
    }

    this.getTimetable();
  }

  // reset() {
  //   this.select_datas.s_date = new Date().toISOString();
  //   this.classs = this.storage.getjson('classlist');
  //   this.select_datas.type = 'ABSENTEES';
  //   this.select_datas.message = '';
  //   this.select_datas.staff_id =
  //     this.storage.getjson('teachersDetail')[0]['staff_id'];
  //   this.select_datas.Is_Admin =
  //     this.storage.getjson('teachersDetail')[0]['Is_Admin'];
  // }

  getTimetable() {
    this.loading.present();
    this.authservice
      .post('stafftimetable', {
        staff_id: this.storage.getjson('teachersDetail')[0]['staff_id'],
      })
      .subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.data = res['data'];
            console.log('timeTable', this.data);

            for (let i = 0; i < this.data.length; i++) {
              this.keys = Object.keys(this.data[i]);

              for (let x of this.keys) {
                if (x != 'day' && this.subject.indexOf(x) == -1) {
                  this.subject.push(x);
                }
              }
            }
          }
          this.show = true;
          this.loading.dismissAll();
        },
        (err) => {
          this.loading.dismissAll();
        }
      );
  }
  ngOnDestroy() {
    // Check if screen orientation unlock is supported
    if (this.screenOrientation && this.screenOrientation.unlock) {
      this.screenOrientation.unlock();
    } else {
      console.warn('Screen orientation unlock not supported on this device.');
    }
  }
}
