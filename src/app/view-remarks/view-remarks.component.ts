import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { IonModal, ModalController, Platform, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Base64String } from 'capacitor-voice-recorder';
import { SelectModalComponent } from '../select-modal/select-modal.component';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';
import { TranslateConfigService } from '../service/translate-config.service';

@Component({
  selector: 'app-view-remarks',
  templateUrl: './view-remarks.component.html',
  styleUrls: ['./view-remarks.component.scss'],
})
export class ViewRemarksComponent implements OnInit {
  @ViewChild('portComponent', { static: false }) portComponent: any;
  select_datas: any = {};
  select_datas1: any = {};
  classs: any = [];
  error: any = false;
  recordingTimer = 0;
  timer!: NodeJS.Timeout;
  students: any = [];
  subjects: any = [];
  delete_personalized: any;
  send_personalized: any;
  audioData: {
    fileName: string;
    base64: Base64String | null;
    duration: number;
  } = {
      fileName: '',
      base64: null,
      duration: 0,
    };
  fileName!: any;
  recording: boolean = false;
  base64: any;
  showDatePicker: boolean = false;
  cancel: any;
  send: any;
  delete: any;
  @ViewChild(IonModal)
  modal!: IonModal;
  isPickerOpen: boolean = false;
  isFormSubmitted: boolean = false;
  grpmes: any = [];
  last3days: any = [];
  senditems: any = [];
  studentRemarks: any;
  className: any;
  SubjectName: any;

  constructor(
    public storage: StorageService,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private platform: Platform,
    private router: Router,
    public authservice: AuthService,
    public loading: LoadingService,
    private translate: TranslateConfigService,
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
      .getparam('delete_personalized')
      .then((v) => (this.delete_personalized = v));
    this.translate.getparam('cancel').then((v) => (this.cancel = v));
    this.translate
      .getparam('send_personalized')
      .then((v) => (this.send_personalized = v));
    this.translate.getparam('send').then((v) => (this.send = v));
    this.translate.getparam('delete').then((v) => (this.delete = v));

    this.getallsubject();
    this.reset();
    // this.getIndividualStudentRemarks();
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
    this.classs = this.storage.getjson('classlist');
    this.select_datas.staff_id =
      this.storage.getjson('teachersDetail')[0]['staff_id'];
    this.select_datas.Is_Admin =
      this.storage.getjson('teachersDetail')[0]['Is_Admin'];
    this.getlist();
  }

  onSubmit(form: NgForm) {
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

  async openOptions(data: any, value: any, bind: any, multi: any) {
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
    });
    return await modal.present();
  }

  formatPorts(students: any) {
    return students.map((port: any) => port.name).join(', ');
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

  toggleItems(status: any) {
    if (status) {
      this.portComponent.toggleItems(false);
      this.portComponent.toggleItems(status);
      this.confirm();
    } else {
      this.portComponent.toggleItems(status);
    }
  }

  showHideDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

  confirm() {
    this.portComponent.confirm();
    this.portComponent.close();
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
