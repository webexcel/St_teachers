import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  IonModal,
  ModalController,
  Platform,
} from '@ionic/angular';

import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';
import { TranslateConfigService } from '../service/translate-config.service';

import { OverlayEventDetail } from '@ionic/core/components';
import { SelectModalComponent } from '../select-modal/select-modal.component';

@Component({
  selector: 'app-exam-schedule',
  templateUrl: './exam-schedule.component.html',
  styleUrls: ['./exam-schedule.component.scss'],
})
export class ExamScheduleComponent implements OnInit {
  ios: any = false;
  classs: any = [];
  subjects: any = [];
  exams: any = [];
  students: any[] = [];
  select_datas: any = {};
  clid: any = '-1';
  g_btn: any = false;
  select_datas1: any = {};
  showDatePicker: boolean = false;
  @ViewChild(IonModal)
  modal!: IonModal;
  isPickerOpen: boolean = false;
  isEditMessageOpen: boolean = false;
  isEditMessageOpen1: boolean = false;
  isEditMessageOpen2: boolean = false;
  messageText: any;
  ExamName: any;
  ClassName: any;
  SubjectName: any;

  constructor(
    private platform: Platform,
    private router: Router,
    private translate: TranslateConfigService,
    public loading: LoadingService,
    public authservice: AuthService,
    public storage: StorageService,
    public alertCtrl: AlertController,
    private modalController: ModalController
  ) {
    this.platform.backButton.subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  ngOnInit() {
    this.ios = this.authservice.isiso();
    this.translate.set();
    this.classs = this.storage.getjson('classlist');
    this.select_datas.s_date = new Date().toISOString();
    this.select_datas1.s_date = new Date().toISOString();
    this.getallsubject();
    this.getallexams();
    this.exams = [
      { name: 'Unit-I', id: '1' },
      { name: 'UNIT II', id: '2' },
      { name: 'UNIT III', id: '3' },
      { name: 'Mid-I', id: '4' },
      { name: 'Mid-II', id: '5' },
      { name: 'Mid-III', id: '6' },
      { name: 'Preparatory', id: '7' },
    ];
    this.reset();
    this.getGenerateMarksList();
  }

  reset() {
    this.select_datas.s_date = new Date().toISOString();
  }

  async openOptions(
    data: any,
    value: any,
    bind: any,
    multi: any,
    parameters: any
  ) {
    const modal = await this.modalController.create({
      component: SelectModalComponent,
      componentProps: {
        optionsList: data,
        value: value,
        multi: multi,
        parameters: parameters,
      },
    });

    modal.onDidDismiss().then((result: any) => {
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
        this.select_datas.class = datar;
        this.ClassName =
          datar.length > 0
            ? datar.length + ' Classes Selected'
            : 'No Classes Selected';
      } else {
        if (bind == 'Subject') {
          this.select_datas.subject = result.data;
          this.SubjectName =
            result.data != undefined && result.data.name != undefined
              ? result.data.name + ' Subject Selected'
              : 'No Subject Selected';
        } else if (bind == 'Exams') {
          this.select_datas.exams = result.data;
          this.ExamName =
            result.data != undefined && result.data.exam_type_name != undefined
              ? result.data.exam_type_name + ' Exam Selected'
              : 'No Exam Selected';
          this.getallexams();
        }
      }
    });
    return await modal.present();
  }

  classChange(event: any) {
    if (this.select_datas.exams && this.select_datas.subject) {
      this.g_btn = false;
      this.students = [];
      this.select_datas.student = [];
      this.checkbtn();
    }
  }

  subjectChange(event: any) {
    if (this.select_datas.class && this.select_datas.exams) {
      this.g_btn = false;
      this.students = [];
      this.select_datas.student = [];
      this.checkbtn();
    }
    this.getGenerateMarksList();
  }

  subjectExam(event: any) {
    if (this.select_datas.class && this.select_datas.subject) {
      this.g_btn = false;
      this.students = [];
      this.select_datas.student = [];
      this.checkbtn();
    }
  }

  checkbtn() {
    //this.g_btn = true

    let data = {
      class_Id: this.select_datas.class.id,
      sub: this.select_datas.subject.name,
      examName: this.select_datas.exams.exam_type_name,
    };
    this.loading.present();
    this.authservice.post('EnableGenerateButton', data).subscribe(
      (res: any) => {
        this.loading.dismissAll();
        if (res['data'].length > 0) {
          if (Number(res['data'][0]['count']) == 0) {
            this.g_btn = true;
          } else {
            this.g_btn = false;
            // this.getGenerateMarksList();
          }
        } else {
          this.g_btn = false;
          // this.getGenerateMarksList();
        }
      },
      (err) => {
        this.loading.dismissAll();
      }
    );
  }
  formatPorts(classs: any) {
    return classs.map((port: any) => port.name).join(', ');
  }

  generate() {
    let data = {
      sub: this.select_datas.subject.name,
      examName: this.select_datas.exams.exam_type_name,
      class: this.select_datas.class,
      s_date: this.select_datas.s_date,
      Time: this.select_datas.time,
      portion: this.select_datas.message,
      Is_Admin: this.storage.getjson('teachersDetail')[0]['Is_Admin'],
    };
    this.loading.present();
    this.authservice.post('InsertExamSchedule', data).subscribe(
      (res: any) => {
        this.loading.dismissAll();
        if (res['status']) {
          this.g_btn = false;
          // this.getGenerateMarksList();
        }
      },
      (err) => {
        this.loading.dismissAll();
      }
    );
    //this.g_btn = false
    //this.getStudentsByClass(this.select_datas.class.id)
  }

  getGenerateMarksList() {
    let data = {
      Is_Admin: this.storage.getjson('teachersDetail')[0]['Is_Admin'],
    };
    this.loading.present();
    this.authservice.post('getExamSchedule', data).subscribe(
      (res: any) => {
        this.loading.dismissAll();
        if (res['status']) {
          this.students = res['data'];
        } else {
          this.g_btn = false;
        }
      },
      (err) => {
        this.loading.dismissAll();
      }
    );
  }

  getStudentsByClass(class_Id: any) {
    if (this.clid != class_Id) {
      let data = {
        class_Id: class_Id,
      };
      this.loading.present();
      this.authservice.post('getStudentsByClass', data).subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.clid = class_Id;
            for (let i = 0; i < res['data'].length; i++) {
              this.students.push({
                class_id: this.select_datas.class.id,
                class_sec: this.select_datas.class.name,
                sub_name: this.select_datas.subject.name,
                sub_id: this.select_datas.subject.id,
                stu_name: res['data'][i]['name'],
                adno: res['data'][i]['id'],
                mark: '',
                maxmark: '',
                grade: '',
              });
            }
          }
        },
        (err) => {
          this.loading.dismissAll();
        }
      );
    }
  }

  getallsubject() {
    this.loading.present();
    this.authservice.get('getallsubject').subscribe(
      (res: any) => {
        this.loading.dismissAll();
        if (res['status']) {
          this.subjects = res['data'];
        }
      },
      (err) => {
        this.loading.dismissAll();
      }
    );
  }

  getallexams() {
    this.loading.present();
    this.authservice.get('getallExam').subscribe(
      (res: any) => {
        this.loading.dismissAll();
        if (res['status']) {
          this.exams = res['data'];
        }
      },
      (err) => {
        this.loading.dismissAll();
      }
    );
  }

  async deleteschedule(ID: any) {
    let alert = await this.alertCtrl.create({
      header: 'Delete Exam Schedule',
      //subTitle: this.name,
      //message:message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: (data) => {
            this.loading.present();
            const isAdmin =
              this.storage.getjson('teachersDetail')[0]['Is_Admin'];
            this.authservice
              .post('deleteExamSchedule', { id: ID, Is_Admin: isAdmin })
              .subscribe(
                (res) => {
                  this.loading.dismissAll();
                  // this.getSaveHomeworkDraft();
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

  onSubmit(form: NgForm) {
    this.loading.present();
    this.authservice
      .post('getExamSchedule', {
        Is_Admin: this.storage.getjson('teachersDetail')[0]['Is_Admin'],
      })
      .subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.students = res['data'];
          } else {
            this.g_btn = false;
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
    this.modal.dismiss(null, 'confirm');
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
  }
}
