import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { SelectModalComponent } from '../select-modal/select-modal.component';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';
import { TranslateConfigService } from '../service/translate-config.service';
@Component({
  selector: 'app-mark-enter',
  templateUrl: './mark-enter.page.html',
  styleUrls: ['./mark-enter.page.scss'],
})
export class MarkEnterPage implements OnInit {
  classs: any = [];
  subjects: any = [];
  exams: any = [];
  students: any = [];
  select_datas: any = {};
  clid: any = '-1';
  g_btn: any = false;
  className: any;
  SubjectName: any;
  ExamName: any;

  constructor(
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
    this.classs = this.storage.getjson('classlist');
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
    this.select_datas.Is_Admin =
      this.storage.getjson('teachersDetail')[0]['Is_Admin'];
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

  //this.getStudentsByClass(this.select_datas.class.id)

  classChange() {
    if (this.select_datas.exams && this.select_datas.subject) {
      this.g_btn = false;
      this.students = [];
      this.select_datas.student = [];
      this.checkbtn();
    }
  }

  subjectChange() {
    if (this.select_datas.class && this.select_datas.exams) {
      this.g_btn = false;
      this.students = [];
      this.select_datas.student = [];
      this.checkbtn();
    }
  }

  subjectExam() {
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
            this.getGenerateMarksList();
          }
        } else {
          this.g_btn = false;
          this.getGenerateMarksList();
        }
      },
      (err) => {
        this.loading.dismissAll();
      }
    );
  }

  generate() {
    if (this.select_datas.class.id != undefined && this.select_datas.subject.name != undefined && this.select_datas.exams.exam_type_name != undefined && this.select_datas.exams.exam_type_name != "") {
      let data = {
        class_Id: this.select_datas.class.id,
        sub: this.select_datas.subject.name,
        examName: this.select_datas.exams.exam_type_name,
      };
      this.loading.present();
      this.authservice.post('generateMarksList', data).subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.showToast("List Generated Successfully.", "success");
            this.g_btn = false;
            this.getGenerateMarksList();
          }
        },
        (err) => {
          this.loading.dismissAll();
        }
      );
    } else {
      this.showToast("Please check your data!", "danger");
    }

  }

  getGenerateMarksList() {
    let data = {
      class_Id: this.select_datas.class.id,
      sub: this.select_datas.subject.name,
      examName: this.select_datas.exams.exam_type_name,
    };
    this.loading.present();
    this.authservice.post('getGenerateMarksList', data).subscribe(
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

  async openOptions(
    data: any,
    value: any,
    bind: any,
    multi: any,
    parameters: any
  ) {
    if (!multi && data[0][parameters[0]] != 0) {
      data.splice(0, 0, {});
      data[0][parameters[0]] = 0;
      data[0][parameters[1]] = 'Select Your Option';
    }
    const modal = await this.modalController.create({
      component: SelectModalComponent,
      componentProps: {
        optionsList: data,
        value: value,
        multi: multi,
        parameters: parameters,
      },
    });

    modal.onDidDismiss().then((result) => {
      if (bind == 'Class') {
        this.select_datas.class = result.data;
        this.className =
          result.data != undefined && result.data.name != undefined
            ? result.data.name + ' Selected'
            : 'No Class Selected';
        this.classChange();
      }
      if (bind == 'Subject') {
        this.select_datas.subject = result.data;
        this.SubjectName =
          result.data != undefined && result.data.name != undefined
            ? result.data.name + ' Selected'
            : 'No Subjects Selected';
        this.subjectChange();
      } else if (bind == 'Exams') {
        this.select_datas.exams = result.data;
        this.ExamName =
          result.data != undefined && result.data[parameters[0]] != undefined
            ? result.data.exam_type_name + ' Selected'
            : 'No Exam Selected';
        this.subjectExam();
      }
    });
    return await modal.present();
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

  onSubmit(form: NgForm) {
    this.loading.present();
    this.authservice
      .post('UpdateExamMarkList', { mark: this.students })
      .subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
          }
        },
        (err) => {
          this.loading.dismissAll();
        }
      );
  }
}
