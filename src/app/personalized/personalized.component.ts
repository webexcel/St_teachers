import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import {
  AlertController,
  IonModal,
  ModalController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import {
  Base64String,
  GenericResponse,
  RecordingData,
  VoiceRecorder,
} from 'capacitor-voice-recorder';
import { AuthService } from '../service/auth.service';
import { FilesService } from '../service/files.service';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';
import { TranslateConfigService } from '../service/translate-config.service';

import { SelectModalComponent } from '../select-modal/select-modal.component';

@Component({
  selector: 'app-personalized',
  templateUrl: './personalized.component.html',
  styleUrls: ['./personalized.component.scss'],
})
export class PersonalizedComponent implements OnInit {
  @ViewChild('portComponent', { static: false }) portComponent: any;
  classs: any = [];
  students: any = [];
  select_datas: any = {};
  select_datas1: any = {};
  senditems: any = [];
  grpmes: any = [];
  senditems1: any = [];
  last3days: any = [];
  delete_personalized: any;
  cancel: any;
  send_personalized: any;
  send: any;
  delete: any;
  error: any = false;
  recording: boolean = false;
  fileName!: string;
  audio!: MediaObject;
  Path!: string;
  showDatePicker: boolean = false;

  @ViewChild(IonModal)
  modal!: IonModal;
  isPickerOpen: boolean = false;
  isEditMessageOpen: boolean = false;
  messageText: any;
  messageId: any;
  index: any;
  recordingTimer = 0;
  timer!: NodeJS.Timeout;
  audioData: {
    fileName: string;
    base64: Base64String | null;
    duration: number;
  } = {
      fileName: '',
      base64: null,
      duration: 0,
    };
  seengrpmes: any;
  isEditMessageOpen1: boolean = false;
  showPassword: boolean = false;
  className: any;
  StudentsName: any;
  attachment: any;
  showButton: any;
  isDatePickerOpen: boolean = false;
  s_date: any;

  constructor(
    private serfile: FilesService,
    private media: Media,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    public base64: Base64,
    private sanitizer: DomSanitizer,
    public alertCtrl: AlertController,
    public storage: StorageService,
    private platform: Platform,
    private router: Router,
    private translate: TranslateConfigService,
    public loading: LoadingService,
    public authservice: AuthService,
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
    this.select_datas.class = "";
    this.className = "No CLass Selected";
    this.select_datas.student = [];
    this.students = [];
    this.StudentsName = "No Students Selected";
    this.select_datas.message = "";
    this.s_date = new Date().toISOString();
    this.select_datas.s_date = new Date().toISOString();
    this.classs = this.storage.getjson('classlist');
    this.select_datas.type = 'PERSONALIZE';
    this.select_datas.staff_id =
      this.storage.getjson('teachersDetail')[0]['staff_id'];
    this.select_datas.Is_Admin =
      this.storage.getjson('teachersDetail')[0]['Is_Admin'];
    this.select_datas.image = '';
    this.select_datas.ftype = '';
    this.select_datas.filename = '';
    this.getlist();
  }

  ionViewWillEnter() {
    this.className = 'Select Class';
    this.StudentsName = 'Select Students';
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
      },
      (err) => {
        this.loading.dismissAll();
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

  onSubmit(form: NgForm) {
    if (this.select_datas.classid == undefined || this.select_datas.classid == "") {
      this.showToast("No Class Selected!", "danger");
    } else if (this.select_datas.student == undefined || this.select_datas.student.length == 0) {
      this.showToast("No Students Selected!", "danger");
    } else if (this.select_datas.message == undefined || this.select_datas.message == "") {
      this.showToast("Message is Empty!", "danger");
    } else {
      this.loading.present();
      let stud = [];
      for (let i = 0; i < this.select_datas.student.length; i++) {
        let obj: any = {};
        obj['id'] = this.select_datas.student[i].id;
        obj['name'] = this.select_datas.student[i].name;
        stud.push(obj);
      }
      this.select_datas.student = stud;

      this.authservice.post('newpersonalsms', this.select_datas).subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['STATUS'] || res["status"]) {
            this.showToast("Personal Message Added Successfully.", "success");
            form.resetForm();
            this.reset();
            this.getlist();
          }
        },
        (err) => {
          this.loading.dismissAll();
        }
      );
    }
  }

  async deletecirculars(ID: any) {
    let alert = await this.alertCtrl.create({
      header: this.delete_personalized,
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
      header: this.delete_personalized,
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
      header: this.send_personalized,
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
              .post('movepersonaltofinal', { ids: ID, msgtype: 'PERSONALIZE' })
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

  open() {
    this.fileChooser
      .open()
      .then((uri) => {
        this.filePath.resolveNativePath(uri).then(
          (res) => {
            let f: any = res.split('/');
            this.select_datas.filename = f[f.length - 1].toLowerCase();
            let l: any = res.split('.');
            l = l[l.length - 1].toLowerCase();
            if (
              l == 'jpg' ||
              l == 'jpeg' ||
              l == 'png' ||
              l == 'pdf' ||
              l == 'mp3' ||
              l == 'mp4' ||
              l == 'xls' ||
              l == 'xlsx'
            ) {
              this.select_datas.ftype = l;
              this.error = false;
              if (l == 'mp3') {
                l = `data:audio/mpeg;base64,`;
              } else if (l == 'mp4') {
                l = '';
              } else {
                l = `data:image/${l};base64,`;
              }
              this.base64.encodeFile(res).then(
                (result) => {
                  this.select_datas.image = `${l}${result.split('base64,')[1]}`;
                },
                (err) => {
                  this.error = true;
                }
              );
            } else {
              this.error = true;
            }
          },
          (err) => { }
        );
      })
      .catch((e) => console.log(e));
  }

  checkimage(f: any) {
    if (f) {
      f = f.split('.');
      f = f[f.length - 1].toLowerCase();
      if (f != 'pdf' && f != 'mp3' && f != 'xls' && f != 'xlsx') {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
    //image.event_image.split('.')[image.event_image.split('.').length-1]!='pdf'
  }

  checkmp3(f: any) {
    if (f) {
      f = f.split('.');
      f = f[f.length - 1].toLowerCase();
      if (f == 'mp3') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  checkxls(f: any) {
    if (f) {
      f = f.split('.');
      f = f[f.length - 1].toLowerCase();
      if (f == 'xls' || f == 'xlsx') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  checkpdf(f: any) {
    if (f) {
      f = f.split('.');
      f = f[f.length - 1].toLowerCase();
      if (f == 'pdf') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getfilename(f: any) {
    f = f.split('/');
    f = f[f.length - 1];
    return f;
  }

  startRecord() {
    this.fileName =
      'record' +
      new Date().getDate() +
      new Date().getMonth() +
      new Date().getFullYear() +
      new Date().getHours() +
      new Date().getMinutes() +
      new Date().getSeconds() +
      '.mp3';

    this.Path = this.serfile.filepath() + this.fileName;
    this.audio = this.media.create(this.Path);
    this.select_datas.ftype = '';
    this.select_datas.image = '';
    this.select_datas.filename = '';
    this.audio.startRecord();
    this.recording = true;
  }

  stopRecord() {
    this.audio.stopRecord();
    this.recording = false;

    this.serfile.read(this.fileName).then(
      (res) => {
        let l = res.split('base64,');
        if (l[1].length != 0) {
          this.select_datas.ftype = 'mp3';
          this.select_datas.filename = this.fileName;
          this.error = false;
          this.select_datas.image = this.sanitizer.bypassSecurityTrustUrl(
            'data:audio/mpeg;base64,' + l[1]
          );
        }
      },
      (err) => { }
    );
  }

  deletefile() {
    this.select_datas.ftype = '';
    this.select_datas.image = '';
    this.select_datas.filename = '';
  }

  formatPorts(students: any) {
    return students.map((port: any) => port.name).join(', ');
  }

  onSubmit1() {
    this.loading.present();
    this.authservice
      .post('searchpersonalmessagelist', {
        Is_Admin: this.storage.getjson('teachersDetail')[0]['Is_Admin'],
        staff_id: this.storage.getjson('teachersDetail')[0]['staff_id'],
        type: 'PERSONALIZE',
        classid: this.authservice.classids(),
        s_date: this.select_datas1.s_date,
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

  editMessage(id: any, message: any) {
    this.loading.present();
    this.authservice
      .post('editMessage', { messageId: id, messageText: message })
      .subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.getlist();
          }
        },
        (err) => {
          this.loading.dismissAll();
        }
      );
  }

  toggleMessage(id: any, message: any, image: any, i: any) {
    if (id && id !== 'cancel' && id !== 'confirm') {
      this.index = i;
      this.messageId = id;
      this.messageText = message;
      this.attachment = image;
    }
    if (id === 'confirm') {
      this.editMessage(this.messageId, this.messageText);
    }
    this.isEditMessageOpen = !this.isEditMessageOpen;
  }

  checkRecordingAbility() {
    VoiceRecorder.requestAudioRecordingPermission().then(
      (result: GenericResponse) => console.log(result.value)
    );
    VoiceRecorder.canDeviceVoiceRecord()
      .then((result: GenericResponse) => true)
      .catch(() => false);
  }

  onStartRecording() {
    this.audioData = {
      base64: null,
      duration: 0,
      fileName: '',
    };
    this.checkRecordingAbility();
    this.fileName =
      'record' +
      new Date().getDate() +
      new Date().getMonth() +
      new Date().getFullYear() +
      new Date().getHours() +
      new Date().getMinutes() +
      new Date().getSeconds() +
      '.mp3';
    VoiceRecorder.startRecording()
      .then((result: GenericResponse) => {
        this.select_datas.ftype = '';
        this.select_datas.image = '';
        this.select_datas.filename = '';
        this.recording = true;
        if (!this.timer) {
          this.timer = setInterval(() => {
            this.recordingTimer += 1;
          }, 1000);
        }
        this.error = false;
        this.audioData = {
          base64: null,
          duration: 0,
          fileName: this.fileName ?? '',
        };
      })
      .catch((error) => {
        this.error = true;
      });
  }

  onStopRecording() {
    VoiceRecorder.stopRecording()
      .then((result: RecordingData) => {
        this.recording = false;
        if (this.timer) {
          clearInterval(this.timer);
        }
        const { mimeType, recordDataBase64, msDuration } = result.value;
        this.select_datas.filename = this.fileName;
        this.select_datas.ftype = 'mp3';
        this.error = false;
        this.audioData = {
          ...this.audioData,
          base64: `data:${mimeType};base64,${recordDataBase64}`,
          duration: Math.floor(msDuration / 1000),
          fileName: this.fileName ?? '',
        };
        this.select_datas.image = recordDataBase64;
      })
      .catch((error) => {
        this.error = true;
      });
  }

  formatTime(duration: number) {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = '';

    if (hrs > 0) {
      ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }

    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;

    return ret;
  }

  extractUrl(text: string) {
    var urlRegex =
      /(https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)|((?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/g;
    return text.replace(urlRegex, function (url) {
      return (
        '<a href="' +
        (url.startsWith('http') ? url : 'http://' + url) +
        '" target="_blank">' +
        url +
        '</a>'
      );
    });
  }

  async openOptions(data: any, value: any, multi: any) {
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
        for (let i = 0; i < result.data.length; i++) {
          if (result.data[i].checked) {
            datar.push(result.data[i]);
            //datar.push(result.data[i].name);
          }
        }
        this.select_datas.student = datar;

        this.StudentsName =
          datar.length > 0
            ? datar.length + ' Student Selected'
            : 'No Students Selected';
      } else {
        if (result.data.id != undefined) {
          this.select_datas.classid = result.data.id;
          this.getStudentsByClass(this.select_datas.classid);
        } else {
          this.students = [];
        }
        this.className = result.data.name != undefined && result.data.name.length > 0 ? result.data.name + ' Selected'
          : 'No Selected Classes';
      }
    });
    return await modal.present();
  }

  seencirculars1(ID: any) {
    //Is_Admin
    this.loading.present();
    this.authservice.post('seenpersonalmessage', { id: ID }).subscribe(
      (res: any) => {
        this.loading.dismissAll();
        if (res['status']) {
          this.seengrpmes = res['senditem'];
          this.seengrpmes.sort(
            (a: any, b: any) => b.seen_status - a.seen_status
          );
        }
      },
      (err) => {
        this.loading.dismissAll();
      }
    );
  }

  toggleMessage1() {
    this.isEditMessageOpen1 = !this.isEditMessageOpen1;
  }



  deleteSelectedItems() {
    const selectedIds = this.grpmes.map((item: any) => item.ID);
    // const formattedIds = { ids: selectedIds.map((id: any) => ({ id })) };

    this.authservice.post('getAlldeletepersonalmessagelist', { ids: selectedIds.map((id: any) => ({ id })) }).subscribe(
      (res) => {
        this.loading.dismissAll();
        // this.getpersonalmessagelist();
        this.getlist()
      },
      (err) => {
        this.loading.dismissAll();
      }
    );

  }


}
