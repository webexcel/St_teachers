import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  IonModal,
  ModalController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { SelectModalComponent } from '../select-modal/select-modal.component';
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
  @ViewChild('portComponent', { static: false }) portComponent: any;
  senditems: any = [];
  grpmes: any = [];
  senditems1: any = [];
  last3days: any = [];
  classs: any = [];
  students: any = [];
  select_datas: any = {};
  select_datas1: any = {};

  selectedSessions: any = '1';

  select_sessions = [
    { id: '1', name: 'Full' },
    { id: '2', name: 'Morning' },
    { id: '3', name: 'Afternoon' },
  ];

  delete_attendance: any;
  cancel: any;
  send_attendance: any;
  send: any;
  delete: any;
  showDatePicker: boolean = false;
  @ViewChild(IonModal)
  modal!: IonModal;
  isPickerOpen: boolean = false;
  className: any;
  StudentsName: any;
  Session: any;
  SessionName: any;
  isDatePickerOpen: boolean = false;
  s_date: any;

  constructor(
    public alertCtrl: AlertController,
    private platform: Platform,
    private router: Router,
    private translate: TranslateConfigService,
    public loading: LoadingService,
    public authservice: AuthService,
    public storage: StorageService,
    private modalController: ModalController,
    private toastController: ToastController
  ) {
    this.platform.backButton.subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  ngOnInit() {
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

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'middle'
    });
    toast.present();
  }

  reset() {
    this.students = [];
    this.select_datas.class = "";
    this.className = "No Class Selected";
    this.select_datas.student = [];
    this.StudentsName = "No Student Selceted";
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

  ionViewDidLoad() { }

  ionViewWillEnter() { }
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
      }
    );
  }

  getlist() {
    this.loading.present();
    this.authservice
      .post('getpersonalAbsentmessagelist', {
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
        }
      );
  }

  async openOptions(data: any, value: any, multi: any, bind: any) {
    // if (!multi && data[0].name != 0) {
    //   data.splice(0, 0, { id: 0, name: 'Select Your Class' });
    // }
    const modal = await this.modalController.create({
      component: SelectModalComponent,
      componentProps: {
        optionsList: data,
        value: value,
        multi: multi,
        parameters: ['id', 'name'],
      },
    });

    modal.onDidDismiss().then((result) => {
      if (multi) {
        let datar = [];
        let textData = [];
        if (result.data != undefined) {
          for (let i = 0; i < result.data.length; i++) {
            if (result.data[i].checked) {
              datar.push(result.data[i]);
              //datar.push(result.data[i].name);
            }
          }
        }
        if (bind == 'Students') {
          this.select_datas.student = datar;
          this.StudentsName =
            datar.length > 0
              ? datar.length + ' Students Selected'
              : 'No Students Selected';
        } else if (bind == 'Session') {
          this.selectedSessions = datar;
          this.SessionName =
            datar.length > 0
              ? datar.length + ' Sessions Selected'
              : 'No Students Selected';
        }
      } else {
        this.select_datas.classid = result.data.id;
        this.getStudentsByClass(this.select_datas.classid);
        this.className =
          result.data.name != undefined && result.data.id != 0
            ? result.data.name
            : 'No Classes Selected';
      }
    });
    return await modal.present();
  }

  onSubmit(form: NgForm) {
    if (this.select_datas.classid == undefined || this.select_datas.classid == "") {
      this.showToast("No Class Selected!", "danger");
    } else if (this.select_datas.student == undefined || this.select_datas.student.length == 0) {
      this.showToast("No Student Selected!", "danger");
    } else {
      this.select_datas.abtype = this.selectedSessions;

      this.loading.present();
      this.authservice.post('newAbsentees', this.select_datas).subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['STATUS'] || res['status']) {
            this.showToast("Absent Added Successfully", "success");
            form.resetForm();
            this.reset();
          }
        },
        (err) => {
          this.loading.dismissAll();
        }
      );
    }
  }

  isSelected(sessionName: string): boolean {
    return this.selectedSessions.includes(sessionName);
  }

  updateSelectedSession(sessionId: string) {
    this.selectedSessions = sessionId;
  }

  async show(msg: any) {
    let alert = await this.alertCtrl.create({
      header: msg,
      buttons: [
        {
          text: this.cancel,
          role: 'cancel',
          handler: (data) => { },
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
        },
        {
          text: this.delete,
          handler: (data) => {
            this.loading.present();
            this.authservice
              .post('getdeletepersonalAbsentmessagelist', { ID: ID })
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
        },
        {
          text: this.delete,
          handler: (data) => {
            this.loading.present();
            this.authservice
              // getdeletepersonalAbsentmessagelist
              // .post('senddeletepersonalmessagelist', { ID: ID })
              .post('getdeletepersonalAbsentmessagelist', { ID: ID })
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
        },
        {
          text: this.send,
          handler: (data) => {
            this.loading.present();
            this.authservice
              .post('movepersonalAbsenttofinal', {
                ids: ID,
                msgtype: 'ABSENTEES',
              })
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
      .post('searchAbenteesmessagelist', {
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
        }
      );
  }
  showHideDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

  formatDate(date: Date = new Date()) {
    const today = new Date(date);
    const yyyy = today.getFullYear();
    let mm = `${today.getMonth() + 1}`; // Months start at 0!
    let dd = `${today.getDate()}`;

    if (+dd < 10) {
      dd = '0' + dd;
    }
    if (+mm < 10) {
      mm = '0' + mm;
    }

    return dd + '/' + mm + '/' + yyyy;
  }

  cancel_date() {
    this.modal.dismiss(null, 'confirm');
  }

  confirm_date() {
    this.select_datas.s_date = this.s_date;
    this.modal.dismiss(null, 'confirm');
  }

  toggleDateSelect() {
    this.s_date = this.select_datas.s_date;
    this.isDatePickerOpen = !this.isDatePickerOpen;
  }

  toggleDateSelection() {
    this.isPickerOpen = !this.isPickerOpen;
  }
  onWillDismiss(event: Event, type: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'cancel') {
      if (type == 'first') {
        this.select_datas.s_date = null;
      } else {
        this.select_datas1.s_date = null;
      }
    }
    if (type == 'first') {
      this.isDatePickerOpen = false;
    } else {
      this.isPickerOpen = false;
    }
  }
}
