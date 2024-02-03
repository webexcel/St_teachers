import { Component, OnInit, ViewChild } from '@angular/core';
// import { IonicSelectableComponent } from 'ionic-selectable';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { AlertController, IonModal, Platform } from '@ionic/angular';
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

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.scss'],
})
export class HomeworkComponent implements OnInit {
  ios: any = false;
  @ViewChild('portComponent', { static: false }) portComponent: any;
  classs: any = [];
  subjects: any = [];
  select_datas: any = {};
  select_datas1: any = {};
  getwhdates: any = [];
  gethw: any = [];
  last3daysdates: any = [];
  last3days: any = [];
  recentdata: any = [];
  recentdata1: any = [];
  recentdates: any = [];

  senditems1dates: any = [];
  senditems1: any = [];

  delete_homework: any;
  cancel: any;
  delete: any;
  recording: boolean = false;
  fileName!: string;
  audio!: MediaObject;
  Path!: string;
  error: any = false;
  showDatePicker: boolean = false;
  @ViewChild(IonModal)
  modal!: IonModal;
  isPickerOpen: boolean = false;
  messageText: any;
  messageId: any;
  index: any;
  isEditMessageOpen: boolean = false;
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
    public authservice: AuthService
  ) {
    this.platform.backButton.subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  ngOnInit() {
    this.ios = this.authservice.isiso();
    this.translate.set();
    this.translate
      .getparam('delete_homework')
      .then((v) => (this.delete_homework = v));
    this.translate.getparam('cancel').then((v) => (this.cancel = v));
    this.translate.getparam('delete').then((v) => (this.delete = v));
    this.reset();
    this.getSaveHomeworkDraft();
    this.getallsubject();
    this.getSaveHomework();
  }

  reset() {
    this.select_datas.s_date = new Date().toISOString();
    this.select_datas.staff_id =
      this.storage.getjson('teachersDetail')[0]['staff_id'];
    this.select_datas.Is_Admin =
      this.storage.getjson('teachersDetail')[0]['Is_Admin'];
    this.classs = this.storage.getjson('classlist');
    this.select_datas1.s_date = new Date().toISOString();
    this.select_datas.image = '';
    this.select_datas.type = '';
    this.select_datas.filename = '';
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

  classChange(event: any) {}

  getSaveHomeworkDraft() {
    this.recentdata1 = {};
    this.recentdates = [];
    this.loading.present();
    this.authservice
      .post('getSaveHomeworkDraft', {
        Is_Admin: this.storage.getjson('teachersDetail')[0]['Is_Admin'],
        staff_id: this.storage.getjson('teachersDetail')[0]['staff_id'],
        classid: this.authservice.classids(),
      })
      .subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.recentdata = res['data'];
            let recentdata = res['data'];
            for (let i = 0; i < recentdata.length; i++) {
              let d = recentdata[i]['MSG_DATE'];
              if (this.recentdates.indexOf(d) == -1) {
                this.recentdates.push(d);
                console.log('recent ddatesss', this.recentdates);
                this.recentdata1[d] = [];
              }
              console.log('recent data', recentdata[i]);
              recentdata[i].MESSAGE = this.authservice.extractUrl(
                recentdata[i].MESSAGE
              );

              this.recentdata1[d].push(recentdata[i]);
              console.log('datatatatata', this.recentdata1);
            }
          }
        },
        (err) => {
          this.loading.dismissAll();
          console.log(err);
        }
      );
  }

  getSaveHomework() {
    //this.gethw = {};
    this.getwhdates = [];
    //this.last3days = {};
    this.last3daysdates = [];
    this.loading.present();
    this.authservice
      .post('getSaveHomework', {
        Is_Admin: this.storage.getjson('teachersDetail')[0]['Is_Admin'],
        staff_id: this.storage.getjson('teachersDetail')[0]['staff_id'],
        classid: this.authservice.classids(),
      })
      .subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.gethw = res['data'];
            // let gethw = res['data'];
            this.last3days = res['last3senditem'];
            console.log('Madhavan', this.gethw);
            console.log('Madhavan', this.gethw);
            // for (let i = 0; i < gethw.length; i++) {
            //   let d = gethw[i]['MSG_DATE'];
            //   if (this.getwhdates.indexOf(d) == -1) {
            //     this.getwhdates.push(d);
            //     this.gethw[d] = [];
            //   }
            //   this.gethw[d].push(gethw[i]);
            // }
            // for (let i = 0; i < last3days.length; i++) {
            //   let d = last3days[i]['MSG_DATE'];
            //   if (this.last3daysdates.indexOf(d) == -1) {
            //     this.last3daysdates.push(d);
            //     this.last3days[d] = [];
            //     console.log('Madhavan', this.last3days);
            //   }
            //   this.last3days[d].push(last3days[i]);
            // }
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

  onSubmit(form: NgForm) {
    this.loading.present();
    this.authservice.post('saveHomeworkMessage', this.select_datas).subscribe(
      (res: any) => {
        this.loading.dismissAll();
        if (res['status']) {
          form.resetForm();
          this.reset();
          this.getSaveHomeworkDraft();
        }
      },
      (err) => {
        this.loading.dismissAll();
        console.log(err);
      }
    );
  }

  async deletehomework(ID: any) {
    let alert = await this.alertCtrl.create({
      header: this.delete_homework,
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
            this.authservice.post('deletehomework', { id: ID }).subscribe(
              (res) => {
                this.loading.dismissAll();
                this.getSaveHomeworkDraft();
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
  async deletehomework1(ID: any) {
    let alert = await this.alertCtrl.create({
      header: this.delete_homework,
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
            this.authservice.post('senddeletehomework', { id: ID }).subscribe(
              (res) => {
                this.loading.dismissAll();
                this.getSaveHomework();
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
  toggleHomework(id: any, message: any, i: any) {
    console.log('toggle', id);
    if (id != 'cancel' && id != 'confirm') {
      this.index = i;
      this.messageId = id;
      this.messageText = message;
    }
    if (id == 'confirm') {
      console.log('message id', this.index);
      this.last3days[this.index].message = this.messageText;
      this.editMessage(this.messageId, this.messageText);
    }
    this.isEditMessageOpen = !this.isEditMessageOpen;
  }
  editMessage(id: any, message: any) {
    this.loading.present();
    this.authservice
      .post('editHomework', { messageId: id, messageText: message })
      .subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.getSaveHomeworkDraft();
            this.getallsubject();
            this.getSaveHomework();
          }
        },
        (err) => {
          this.loading.dismissAll();
          console.log(err);
        }
      );
  }
  formatPorts(classs: any) {
    return classs.map((port: any) => port.name).join(', ');
  }

  open() {
    this.fileChooser
      .open()
      .then((uri) => {
        console.log(uri);
        this.filePath.resolveNativePath(uri).then(
          (res) => {
            console.log(res);
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
              this.select_datas.type = l;
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
                  console.log('@log file open error: ', err);
                  this.error = true;
                }
              );
            } else {
              this.error = true;
            }
          },
          (err) => {
            console.log(err);
          }
        );
      })
      .catch((e) => console.log(e));
  }

  checkimage(f: any) {
    if (f) {
      f = f.split('.');
      f = f[f.length - 1].toLowerCase();
      console.log(f);
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
    console.log(this.Path);
    this.audio = this.media.create(this.Path);
    this.select_datas.type = '';
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
        console.log(res);
        let l = res.split('base64,');
        if (l[1].length != 0) {
          this.select_datas.filename = this.fileName;
          this.select_datas.type = 'mp3';
          this.error = false;
          this.select_datas.image = this.sanitizer.bypassSecurityTrustUrl(
            'data:audio/mpeg;base64,' + l[1]
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deletefile() {
    this.select_datas.type = '';
    this.select_datas.image = '';
    this.select_datas.filename = '';
  }

  onSubmit1() {
    this.senditems1dates = [];
    this.senditems1 = {};
    this.loading.present();
    this.authservice
      .post('searchSaveHomework', {
        Is_Admin: this.storage.getjson('teachersDetail')[0]['Is_Admin'],
        staff_id: this.storage.getjson('teachersDetail')[0]['staff_id'],
        classid: this.authservice.classids(),
        s_date: this.select_datas1.s_date,
      })
      .subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            let senditems1 = res['data'];
            for (let i = 0; i < senditems1.length; i++) {
              let d = senditems1[i]['MSG_DATE'];
              if (this.senditems1dates.indexOf(d) == -1) {
                this.senditems1dates.push(d);
                this.senditems1[d] = [];
              }
              this.senditems1[d].push(senditems1[i]);
            }
          }
        },
        (err) => {
          this.loading.dismissAll();
          console.log(err);
        }
      );
  }

  movehomeworktofinal() {
    let data: any = [];
    for (let i = 0; i < this.recentdata.length; i++) {
      data.push({
        CLASSSEC: this.recentdata[i]['CLASS'],
        ID: this.recentdata[i]['MSG_ID'],
      });
    }
    data = { CLASSSEC: data };
    this.authservice.post('movehomeworktofinal', data).subscribe(
      (res: any) => {
        this.loading.dismissAll();
        if (res['status']) {
          this.getSaveHomeworkDraft();
          this.getSaveHomework();
        }
      },
      (err) => {
        this.loading.dismissAll();
        console.log(err);
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
    console.log('confirm');
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
    // VoiceRecorder.hasAudioRecordingPermission.then((result: GenericResponse) => console.log(result.value))
    VoiceRecorder.startRecording()
      .then((result: GenericResponse) => {
        this.select_datas.type = '';
        this.select_datas.image = '';
        this.select_datas.filename = '';
        this.recording = true;
        if (!this.timer) {
          this.timer = setInterval(() => {
            console.log('@log: this.recordingTimer: ', this.recordingTimer);
            this.recordingTimer += 1;
          }, 1000);
        }
        this.error = false;
        this.audioData = {
          base64: null,
          duration: 0,
          fileName: this.fileName ?? '',
        };
        console.log('@log recording value: ', result.value);
      })
      .catch((error) => {
        this.error = true;
        console.log('@log recording error: ', error);
      });
  }

  onStopRecording() {
    VoiceRecorder.stopRecording()
      .then((result: RecordingData) => {
        this.recording = false;
        if (this.timer) {
          clearInterval(this.timer);
        }
        console.log('@log recorded value: ', result.value);
        const { mimeType, recordDataBase64, msDuration } = result.value;
        this.select_datas.filename = this.fileName;
        this.select_datas.type = 'mp3';
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
        console.log('@log recorded error: ', error);
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
}
