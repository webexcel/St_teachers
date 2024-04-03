import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { IonModal, ModalController, Platform } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Base64String } from 'capacitor-voice-recorder';
import { tap } from 'rxjs/operators';
import { SelectModalComponent } from '../select-modal/select-modal.component';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';
import { TranslateConfigService } from '../service/translate-config.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  ios: any = false;
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

  grpmes: any = [];
  last3days: any = [];
  senditems: any = [];
  studentRemarks: any;
  StudentsName: any;
  SubjectName: any;
  ClassName: any;

  constructor(
    public storage: StorageService,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private platform: Platform,
    private router: Router,
    public authservice: AuthService,
    public loading: LoadingService,
    private translate: TranslateConfigService,
    private modalController: ModalController
  ) {
    this.platform.backButton.subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  ngOnInit() {
    this.ios = this.authservice.isiso();
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
    this.select_datas1.s_date = new Date().toISOString();

    this.getallsubject();
    this.reset();
    this.getStudentRemarks();
  }

  reset() {
    this.classs = this.storage.getjson('classlist');
    this.select_datas.staff_id =
      this.storage.getjson('teachersDetail')[0]['staff_id'];
    this.select_datas.Is_Admin =
      this.storage.getjson('teachersDetail')[0]['Is_Admin'];
    this.getlist();
  }

  async openOptions(data: any, value: any, bind: any, multi: any) {
    console.log('aaaaaaaaaaaaaa', data);
    console.log('aaaaaaaaaaaaaa', value);
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
        if (bind == 'Students') {
          this.select_datas.student = datar;
          console.log('afsdf', this.select_datas.student);
          this.StudentsName =
            datar.length > 0
              ? datar.length + ' Students Selected'
              : 'No Students Selected';
        } else if (bind == 'Subject') {
          this.select_datas.subject = datar;
          console.log('afsdf', this.select_datas.subject);
          this.SubjectName =
            datar.length > 0
              ? datar.length + ' Subjects Selected'
              : 'No Subjects Selected';
        }
      } else {
        this.select_datas.class = result.data.id;
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx', this.select_datas.class);
        this.getStudentsByClass(this.select_datas.class);
        this.ClassName =
          result.data.name != undefined && result.data.id != 0
            ? result.data.name
            : 'No Classes Selected';
      }
    });
    return await modal.present();
  }

  onSubmit(form: NgForm) {
    if (this.select_datas.student.length) {
      this.select_datas.student.forEach((student: { name: any }) => {
        const hyphenIndex = student.name.indexOf('-');
        if (hyphenIndex !== -1) {
          student.name = student.name.substring(0, hyphenIndex).trim();
        }
      });

      console.log(this.select_datas);
      this.loading.present();
      this.authservice
        .post('AddstudentRemarks', this.select_datas)
        .pipe(
          tap((res: any) => {
            this.loading.dismissAll();
            if (res['STATUS']) {
              form.resetForm();
              this.reset();
              this.getlist();
            }
          })
        )
        .subscribe(
          () => {
            this.getStudentRemarks(); // Move getStudentRemarks here
          },
          (err) => {
            this.loading.dismissAll();
            console.log(err);
          }
        );
    } else {
      this.getStudentRemarks(); // If there are no students selected, still fetch remarks
    }
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
        console.log(err);
      }
    );
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
          console.log(err);
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
        console.log(err);
      }
    );
  }

  getStudentRemarks() {
    this.loading.present();
    this.authservice
      .post('getstudentRemarks', {
        staff_id: this.storage.getjson('teachersDetail')[0]['staff_id'],
      })
      .subscribe(
        (res: any) => {
          this.loading.dismissAll();
          console.log('Response:', res);

          if (res['status']) {
            this.studentRemarks = res['data'];
          } else {
            this.studentRemarks = [];
          }
        },
        (err) => {
          this.loading.dismissAll();
          console.error('Error:', err);
        }
      );
  }
}
