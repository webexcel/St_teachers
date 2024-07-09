import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal, ModalController, Platform, ToastController } from '@ionic/angular';
import { Base64String } from 'capacitor-voice-recorder';
import { SelectModalComponent } from '../select-modal/select-modal.component';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';
import { TranslateConfigService } from '../service/translate-config.service';

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.page.html',
  styleUrls: ['./remarks.page.scss'],
})
export class RemarksPage implements OnInit {
  @ViewChild('portComponent', { static: false }) portComponent: any;
  @ViewChild(IonModal) modal!: IonModal;

  presentView: any; select_datas: any = {}; select_datas1: any = {}; classs: any = []; SubjectName: any;
  error: any = false; recordingTimer = 0; timer!: NodeJS.Timeout; students: any = []; subjects: any = [];
  delete_personalized: any; send_personalized: any; fileName!: any; recording: boolean = false; base64: any;
  showDatePicker: boolean = false; cancel: any; send: any; delete: any; isPickerOpen: boolean = false;
  isFormSubmitted: boolean = false; grpmes: any = []; last3days: any = []; senditems: any = []; studentRemarks: any;
  className: any; StudentsName: any; ClassName: any;
  audioData: {
    fileName: string;
    base64: Base64String | null;
    duration: number;
  } = {
      fileName: '',
      base64: null,
      duration: 0,
    };

  constructor(public storage: StorageService, private platform: Platform, private router: Router, public authservice: AuthService,
    public loading: LoadingService, private translate: TranslateConfigService, private modalController: ModalController,
    private toastController: ToastController) { }

  ngOnInit() {
    this.presentView = "view";
    this.resetAdd();
    this.resetView();
    this.getallsubject();
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

  openAddForm() {
    this.presentView = "add";
    this.resetAdd();
  }

  onAddSubmit() {
    if (this.select_datas.class == undefined || this.select_datas.class == "") {
      this.showToast("No Class Selected!", "danger");
    } else if (this.select_datas.student == undefined || this.select_datas.student.length == 0) {
      this.showToast("No Student Selected!", "danger");
    } else if (this.select_datas.subject == undefined || this.select_datas.subject.length == 0) {
      this.showToast("No Subject Selected!", "danger");
    } else if (this.select_datas.message == undefined || this.select_datas.message == "") {
      this.showToast("Message is Empty!", "danger");
    } else {
      this.select_datas.student.forEach((student: { name: any }) => {
        const hyphenIndex = student.name.indexOf('-');
        if (hyphenIndex !== -1) {
          student.name = student.name.substring(0, hyphenIndex).trim();
        }
      });
      this.loading.present();
      this.authservice.post('AddstudentRemarks', this.select_datas)
        .subscribe(
          (res: any) => {
            this.loading.dismissAll();
            if (res['status']) {
              this.showToast("Remark Added Successfully.", "success");
              this.presentView = "view";
              this.resetAdd();
            }
          },
          (err) => {
            this.loading.dismissAll();
          }
        );
    }
  }

  closeAddForm() {
    this.presentView = "view";
  }

  resetAdd() {
    this.select_datas.class = "";
    this.ClassName = "No Class Selected";
    this.students = [];
    this.select_datas.student = [];
    this.StudentsName = "No Students Selected";
    this.subjects.forEach((element: any) => {
      if (element.checked) {
        element.checked = false;
      }
    });
    this.select_datas.subject = [];
    this.SubjectName = "No Subjects Selected";
    this.select_datas.message = "";
    this.classs = this.storage.getjson('classlist');
    this.select_datas.staff_id =
      this.storage.getjson('teachersDetail')[0]['staff_id'];
    this.select_datas.Is_Admin =
      this.storage.getjson('teachersDetail')[0]['Is_Admin'];
    this.getlist();
  }

  resetView() {
    this.classs = this.storage.getjson('classlist');
    this.select_datas.staff_id =
      this.storage.getjson('teachersDetail')[0]['staff_id'];
    this.select_datas.Is_Admin =
      this.storage.getjson('teachersDetail')[0]['Is_Admin'];
    this.getlist();
  }

  async openOptions(evt: any, data: any, value: any, bind: any, multi: any) {
    if (!multi && data[0].id != 0) {
      data.splice(0, 0, { id: 0, name: 'Select Your Subject' });
    }
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
      if (evt == "view") {
        if (bind == 'Class') {
          this.select_datas.class = result.data;
          this.className =
            result.data != undefined && result.data.name != undefined
              ? result.data.name + ' Selected'
              : 'No Class Selected';
        } else if (bind == 'Subject') {
          this.select_datas.subject = result.data;
          this.SubjectName =
            result.data != undefined && result.data.name != undefined
              ? result.data.name + ' Selected'
              : 'No Subjects Selected';
        }
      }
      if (evt == "add") {
        if (multi) {
          let datar = [];
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
          } else if (bind == 'Subject') {
            this.select_datas.subject = datar;
            this.SubjectName =
              datar.length > 0
                ? datar.length + ' Subjects Selected'
                : 'No Subjects Selected';
          }
        } else {
          this.select_datas.class = result.data.id;
          this.getStudentsByClass(this.select_datas.class);
          this.ClassName =
            result.data.name != undefined && result.data.id != 0
              ? result.data.name
              : 'No Classes Selected';
        }
      }
    });
    return await modal.present();
  }

  classChange(event: any) {
    this.select_datas.student = [];
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
        this.select_datas.student = [];
        this.StudentsName = 'No Students Selected';
      },
      (err) => {
        this.loading.dismissAll();
      }
    );
  }

  onViewSubmit(form: NgForm) {
    if (this.select_datas.class == undefined || this.select_datas.class.id == undefined || this.select_datas.class.id == "") {
      this.showToast("No Class Selected", "danger");
    } else if (this.select_datas.subject == undefined || this.select_datas.subject.id == undefined || this.select_datas.subject.id == "") {
      this.showToast("No Class Subject", "danger");
    } else {
      this.isFormSubmitted = true;
      this.loading.present();

      this.authservice
        .post('ViewstudentRemarks', {
          class: this.select_datas.class,
          subject: this.select_datas.subject,
        })
        .subscribe(
          (res: any) => {
            this.loading.dismissAll();
            if (res['status']) {
              this.students = res['data'];
              this.studentRemarks = res['data'];
            } else {
              this.studentRemarks = [];
            }
          },
          (err) => {
            this.loading.dismissAll();
          }
        );
    }
  }

  getlist() {
    this.loading.present();
    this.authservice
      .post('getpersonalmessagelist', {
        Is_Admin: this.storage.getjson('teachersDetail')[0]['Is_Admin'],
        staff_id: this.storage.getjson('teachersDetail')[0]['staff_id'],
        type: 'PERSONALIZE',
        classid: this.authservice.classids(),
      })
      .subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.grpmes = res['data'];
            var i = 0;
            for (i = 0; i < this.grpmes.length; i++) {
              this.grpmes[i].message = this.authservice.extractUrl(
                this.grpmes[i].message
              );
            }
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

}
