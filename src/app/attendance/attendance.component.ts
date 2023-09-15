import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';
import { TranslateConfigService } from '../service/translate-config.service';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  ios: any = false;
  @ViewChild('portComponent', { static: false }) portComponent: any;
  senditems: any = [];
  grpmes: any = [];
  senditems1: any = [];
  last3days: any = [];
  classs: any = [];
  students: any = [];
  select_datas: any = {};
  select_datas1: any = {};
  delete_attendance: any;
  cancel: any;
  send_attendance: any;
  send: any;
  delete: any;

  constructor(
    public alertCtrl: AlertController,
    private platform: Platform,
    private router: Router,
    private translate: TranslateConfigService,
    public loading: LoadingService,
    public authservice: AuthService,
    public storage: StorageService
  ) {
    this.platform.backButton.subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  ngOnInit() {
    this.ios = this.authservice.isiso();
    this.translate.set();
    this.translate
      .getparam('delete_attendance')
      .then((v) => (this.delete_attendance = v));
    this.translate.getparam('cancel').then((v) => (this.cancel = v));
    this.translate
      .getparam('send_attendance')
      .then((v) => (this.send_attendance = v));
    this.translate.getparam('send').then((v) => (this.send = v));
    this.translate.getparam('delete').then((v) => (this.delete = v));
    this.select_datas1.s_date = new Date().toISOString();
    this.reset();
  }

  reset() {
    this.select_datas.s_date = new Date().toISOString();
    this.classs = this.storage.getjson('classlist');
    this.select_datas.type = 'ABSENTEES';
    this.select_datas.message = '';
    this.select_datas.staff_id =
      this.storage.getjson('teachersDetail')[0]['staff_id'];
    this.select_datas.Is_Admin =
      this.storage.getjson('teachersDetail')[0]['Is_Admin'];
    this.getlist();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendancePage');
  }

  ionViewWillEnter() {}
  toggleItems(status: any) {
    if (status) {
      this.portComponent.toggleItems(false);
      this.portComponent.toggleItems(status);
      this.confirm();
    } else {
      this.portComponent.toggleItems(status);
    }
  }

  confirm() {
    this.portComponent.confirm();
    this.portComponent.close();
  }

  classChange(event: any) {
    this.getStudentsByClass(event.value['id']);
  }

  getStudentsByClass(class_Id: any) {
    let data = {
      class_Id: class_Id,
    };
    this.loading.present();
    this.authservice.post('getStudentsByClass', data).subscribe(
      (res: any) => {
        this.loading.dismissAll();
        if (res['status']) {
          this.students = res['data'];
        }
      },
      (err) => {
        this.loading.dismissAll();
        console.log(err);
      }
    );
  }
  getlist() {
    this.loading.present();
    this.authservice
      .post('getpersonalmessagelist', {
        staff_id: this.storage.getjson('teachersDetail')[0]['staff_id'],
        type: 'ABSENTEES',
        classid: this.authservice.classids(),
        Is_Admin: this.storage.getjson('teachersDetail')[0]['Is_Admin'],
      })
      .subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.grpmes = res['data'];
            this.senditems = res['senditem'];
            this.last3days = res['last3senditem'];
          } else {
            this.grpmes = [];
            this.senditems = [];
            this.last3days = [];
          }
        },
        (err) => {
          this.loading.dismissAll();
          console.log(err);
        }
      );
  }

  onSubmit(form: NgForm) {
    if (this.select_datas.student.length) {
      console.log(this.select_datas);
      this.loading.present();
      this.authservice.post('newpersonalsms', this.select_datas).subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['STATUS']) {
            form.resetForm();
            this.reset();
          }
        },
        (err) => {
          this.loading.dismissAll();
          console.log(err);
        }
      );
    }
  }

  async show(msg: any) {
    let alert = await this.alertCtrl.create({
      header: msg,
      buttons: [
        {
          text: this.cancel,
          role: 'cancel',
          handler: (data) => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await alert.present();
  }

  async deletecirculars(ID: any) {
    let alert = await this.alertCtrl.create({
      header: this.delete_attendance,
      //subTitle: this.name,
      //message:message,
      buttons: [
        {
          text: this.cancel,
          role: 'cancel',
          handler: (data) => {
            console.log('Cancel clicked');
          },
        },
        {
          text: this.delete,
          handler: (data) => {
            this.loading.present();
            this.authservice
              .post('getdeletepersonalmessagelist', { ID: ID })
              .subscribe(
                (res) => {
                  this.loading.dismissAll();
                  this.getlist();
                },
                (err) => {
                  this.loading.dismissAll();
                }
              );
          },
        },
      ],
    });
    await alert.present();
  }
  async deletecirculars1(ID: any) {
    let alert = await this.alertCtrl.create({
      header: this.delete_attendance,
      //subTitle: this.name,
      //message:message,
      buttons: [
        {
          text: this.cancel,
          role: 'cancel',
          handler: (data) => {
            console.log('Cancel clicked');
          },
        },
        {
          text: this.delete,
          handler: (data) => {
            this.loading.present();
            this.authservice
              .post('senddeletepersonalmessagelist', { ID: ID })
              .subscribe(
                (res) => {
                  this.loading.dismissAll();
                  this.getlist();
                },
                (err) => {
                  this.loading.dismissAll();
                }
              );
          },
        },
      ],
    });
    await alert.present();
  }
  async movegrouptofinal(ID: any) {
    let alert = await this.alertCtrl.create({
      header: this.send_attendance,
      //subTitle: this.name,
      //message:message,
      buttons: [
        {
          text: this.cancel,
          role: 'cancel',
          handler: (data) => {
            console.log('Cancel clicked');
          },
        },
        {
          text: this.send,
          handler: (data) => {
            this.loading.present();
            this.authservice
              .post('movepersonaltofinal', { ids: ID, msgtype: 'ABSENTEES' })
              .subscribe(
                (res) => {
                  this.loading.dismissAll();
                  this.getlist();
                },
                (err) => {
                  this.loading.dismissAll();
                }
              );
          },
        },
      ],
    });
    await alert.present();
  }

  moveFinalgroupAll() {
    let id = [];
    for (let i = 0; i < this.grpmes.length; i++) {
      id.push({ ID: this.grpmes[i]['ID'] });
    }
    this.movegrouptofinal(id);
  }

  formatPorts(students: any) {
    return students.map((port: any) => port.name).join(', ');
  }

  onSubmit1() {
    this.loading.present();
    this.authservice
      .post('searchpersonalmessagelist', {
        staff_id: this.storage.getjson('teachersDetail')[0]['staff_id'],
        type: 'ABSENTEES',
        classid: this.authservice.classids(),
        s_date: this.select_datas1.s_date,
        Is_Admin: this.storage.getjson('teachersDetail')[0]['Is_Admin'],
      })
      .subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.senditems1 = res['senditem'];
          } else {
            this.senditems1 = [];
          }
        },
        (err) => {
          this.loading.dismissAll();
          console.log(err);
        }
      );
  }
}
