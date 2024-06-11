import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import {
  AlertController,
  IonModal,
  ModalController,
  Platform,
} from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import {
  Base64String,
  GenericResponse,
  RecordingData,
  VoiceRecorder,
} from 'capacitor-voice-recorder';
import { SelectModalComponent } from '../select-modal/select-modal.component';
import { AuthService } from '../service/auth.service';
import { FilesService } from '../service/files.service';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';
import { TranslateConfigService } from '../service/translate-config.service';
import { VideoProcessingService } from '../service/video-processing-service';

@Component({
  selector: 'app-circulars',
  templateUrl: './circulars.component.html',
  styleUrls: ['./circulars.component.scss'],
})
export class CircularsComponent implements OnInit {
  @ViewChild('portComponent', { static: false }) portComponent: any;
  @ViewChild(IonModal) modal!: IonModal;

  ios: any = false;
  optionsSelected: any = [];
  classs: any;
  select_datas: any = {};
  select_datas1: any = {};
  senditem: any = [];
  senditems: any = [];
  senditems1: any = [];
  last3days: any = [];
  grpmes: any = [];
  delete_circulars: any;
  cancel: any;
  send_circulars: any;
  edit_the_message: any;
  send: any;
  delete: any;
  error: any = false;
  recording: boolean = false;
  fileName: string | undefined;
  audio!: MediaObject;
  Path: string | undefined;
  showDatePicker: boolean = false;
  isPickerOpen: boolean = false;
  isEditMessageOpen: boolean = false;
  isEditMessageOpen1: boolean = false;
  isEditMessageOpen2: boolean = false;
  messageText: any;
  messageId: any;
  index: any;
  selectedItems: any[] = [];
  recordingTimer = 0;
  timer!: NodeJS.Timeout;
  showPassword: boolean = true;
  seengrpmes: any;
  seenitems: any;
  className: any;
  dropdownItems = [
    { label: 'Item 1', value: 'item1' },
    { label: 'Item 2', value: 'item2' },
    { label: 'Item 3', value: 'item3' },
    // Add more items as needed
  ];
  audioData: {
    fileName: string;
    base64: Base64String | null;
    duration: number;
  } = {
    fileName: '',
    base64: null,
    duration: 0,
  };
  attachment: any;

  constructor(
    private serfile: FilesService,
    private media: Media,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    public base64: Base64,
    private sanitizer: DomSanitizer,
    public alertCtrl: AlertController,
    private platform: Platform,
    private router: Router,
    private translate: TranslateConfigService,
    public authservice: AuthService,
    public storage: StorageService,
    public loading: LoadingService,
    private modalController: ModalController,
    private file: File,
    private fileOpener: FileOpener,
    private videoService: VideoProcessingService
  ) {
    this.platform.backButton.subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  // handleSelectChange(e: any) {

  // }

  ngOnInit() {
    this.ios = this.authservice.isiso();
    this.translate.set();
    this.translate
      .getparam('delete_circulars')
      .then((v) => (this.delete_circulars = v));
    this.translate.getparam('cancel').then((v) => (this.cancel = v));
    this.translate
      .getparam('send_circulars')
      .then((v) => (this.send_circulars = v));
    this.translate
      .getparam('edit_the_message')
      .then((v) => (this.edit_the_message = v));
    this.translate.getparam('send').then((v) => (this.send = v));
    this.translate.getparam('delete').then((v) => (this.delete = v));
    this.select_datas1.s_date = new Date().toISOString();
    this.reset();
    this.getgroupMessage();
  }

  ionViewWillEnter() {
    this.className = 'No Select Classes';
  }

  reset() {
    this.select_datas.s_date = new Date().toISOString();
    this.select_datas.staff_id =
      this.storage.getjson('teachersDetail')[0]['staff_id'];
    this.classs = this.storage.getjson('classlist');
    this.select_datas.Is_Admin =
      this.storage.getjson('teachersDetail')[0]['Is_Admin'];
    this.select_datas.image = '';
    this.select_datas.type = '';
    this.select_datas.filename = '';
    this.className = 'No Select Classes';
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

  // classChange(event: any) {

  // }

  async openOptions(data: any, value: any) {
    const modal = await this.modalController.create({
      component: SelectModalComponent,
      componentProps: {
        optionsList: data,
        value: value,
        multi: true,
        parameters: ['id', 'name'],
      },
    });

    modal.onDidDismiss().then((result) => {
      let datar = [];
      let textData = [];
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].checked) {
          datar.push(result.data[i]);
          //datar.push(result.data[i].name);
        }
      }
      this.select_datas.class = datar;
      this.className =
        datar.length > 0
          ? datar.length + ' Classes Selected'
          : 'No Selected Classes';
    });
    return await modal.present();
  }

  onSubmit(form: NgForm) {
    this.loading.present();
    this.authservice.post('saveMessage', this.select_datas).subscribe(
      (res: any) => {
        this.loading.dismissAll();
        if (res['status']) {
          form.resetForm();
          this.reset();
          this.getgroupMessage();
        }
      },
      (err) => {
        this.loading.dismissAll();
      }
    );
  }

  // Function to sanitize HTML content
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
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

  getgroupMessage() {
    //Is_Admin
    this.loading.present();
    this.authservice
      .post('getgroupMessage', {
        staff_id: this.storage.getjson('teachersDetail')[0]['staff_id'],
        Is_Admin: this.storage.getjson('teachersDetail')[0]['Is_Admin'],
        classid: this.authservice.classids(),
      })
      .subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.grpmes = res['data'];
            var i = 0;
            for (i = 0; i < this.grpmes.length; i++) {
              this.grpmes[i].message = this.extractUrl(this.grpmes[i].message);
            }
            this.senditems = res['senditem'];
            this.last3days = res['last3senditem'];
          }
        },
        (err) => {
          this.loading.dismissAll();
        }
      );
  }

  async deletecirculars(ID: any) {
    let alert = await this.alertCtrl.create({
      header: this.delete_circulars,
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
            this.authservice.post('deletecirculars', { id: ID }).subscribe(
              (res) => {
                this.loading.dismissAll();
                this.getgroupMessage();
                this.onSubmit1();
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
      header: this.delete_circulars,
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
            this.authservice.post('senddeletecirculars', { id: ID }).subscribe(
              (res) => {
                this.loading.dismissAll();
                this.getgroupMessage();
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

  seencirculars1(ID: any) {
    //Is_Admin
    this.loading.present();
    this.authservice.post('seengroupmessage', { id: ID }).subscribe(
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

  async movegrouptofinal(ID: any) {
    let alert = await this.alertCtrl.create({
      header: this.send_circulars,
      buttons: [
        {
          text: this.cancel,
          role: 'cancel',
        },
        {
          text: this.send,
          handler: (data) => {
            this.loading.present();
            this.authservice.post('movegrouptofinal', { ids: ID }).subscribe(
              (res) => {
                this.loading.dismissAll();
                this.getgroupMessage();
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
      id.push({ id: this.grpmes[i]['ID'] });
    }
    this.movegrouptofinal(id);
  }

  openFile(path: any, data: any) {
    let ext: any = this.extention(path);
    let type: any = this.getMIMEtype(ext);
    var request = new XMLHttpRequest();
    request.open('GET', path, true);
    request.responseType = 'blob';

    request.onloadend = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          var reader = new FileReader();
          reader.onloadend = (e) => {
            if (reader.readyState === FileReader.DONE) {
              if (e.target && e.target.result) {
                this.writeFile(e.target.result, ext, type);
              } else {
                console.error('Error reading file data.');
              }
            }
          };
          reader.readAsDataURL(request.response);
        } else {
          console.error('Failed to load file. Status:', request.status);
        }
      }
    };
    request.send();
  }

  open() {
    this.alertCtrl
      .create({
        header: 'SchoolTree Teachers',
        mode: 'ios',
        cssClass: 'popup-login',
        buttons: [
          {
            text: 'Open Files',
            handler: () => {
              this.videoService
                .promptForVideo()
                .then((videoFile) => {
                  if (videoFile.type.startsWith('video/')) {
                    if (videoFile.size > 5 * 1024 * 1024) {
                      alert(`File size exceeds 5 MB limit.`);
                      return;
                    }
                    this.videoService.uploadVideo(this.select_datas, videoFile);
                    this.videoService
                      .generateThumbnail(videoFile)
                      .then((thumbnailData) => {
                        this.select_datas['thumbnail'] = thumbnailData;
                      })
                      .catch((error) => {
                        console.error('Error generating thumbnail:', error);
                      });
                  }
                  const reader = new FileReader();
                  reader.onload = async (e: any) => {
                    this.select_datas.image = e.target.result;
                    this.select_datas.filename = videoFile.name;
                    this.select_datas.type = videoFile.name.split('.').pop();
                    if (this.select_datas['thumbnail'] == undefined) {
                      this.select_datas['thumbnail'] = '';
                    }
                    this.writeFile(
                      e.target.result,
                      videoFile.name,
                      videoFile.type
                    );
                  };
                  reader.readAsDataURL(videoFile);
                })
                .catch((error) => {
                  console.error('Error generating thumbnail:', error);
                });
            },
          },
          {
            text: 'Open Camera',
            handler: async () => {
              await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Camera,
              }).then(async (media) => {
                this.select_datas.image = media.dataUrl;
                const iData = this.select_datas.image.split(',')[1];
                const byteCharacters = atob(iData);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                  byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                let imageBlob = new Blob([byteArray], { type: 'image/jpeg' });
                let imageUrl = URL.createObjectURL(imageBlob);
                const segments = imageUrl.split('/');
                this.select_datas.filename =
                  segments.pop() + '.' + media.format;
                this.select_datas.type = media.format;
                this.select_datas['thumbnail'] = '';
              });
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((alert) => alert.present());
  }

  extention(url: any) {
    const parts = url.split('.');
    const lastPart = parts[parts.length - 1];
    const extension = lastPart.split('?')[0];
    return extension;
  }

  getMIMEtype(extn: any) {
    let ext: any = extn.toLowerCase();
    let MIMETypes: any = {
      txt: 'text/plain',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      doc: 'application/msword',
      pdf: 'application/pdf',
      jpg: 'image/jpg',
      jpeg: 'image/jpeg',
      bmp: 'image/bmp',
      png: 'image/png',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      rtf: 'application/rtf',
      ppt: 'application/vnd.ms-powerpoint',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    };
    return MIMETypes[ext];
  }

  writeFile(FileContents: any, FileName: any, FileType: any) {
    let blob = this.b64toBlob(FileContents, FileType);
    this.file
      .writeFile(this.file.dataDirectory, FileName, blob, { replace: true })
      .then((response) => {
        this.fileOpener.open(this.file.dataDirectory + FileName, FileType);
      })
      .catch((err: any) => {
        console.error('Error writing file:', err);
      });
  }

  b64toBlob(b64Data: any, contentType: any) {
    let index = String(b64Data).lastIndexOf(',');
    let data = String(b64Data).substring(index + 1);
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  open1() {
    this.fileChooser
      .open()
      .then((uri) => {
        this.filePath.resolveNativePath(uri).then(
          (res) => {
            alert('@log res: ' + JSON.stringify(res));
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
                  alert('@log file open error: ' + JSON.stringify(err));
                  this.error = true;
                }
              );
            } else {
              this.error = true;
            }
          },
          (err) => {
            alert('@log file error: ' + JSON.stringify(err));
          }
        );
      })
      .catch((e) => alert('@log file errorZZ: ' + JSON.stringify(e)));
  }

  checkimage(f: any) {
    if (f) {
      f = f.split('.');
      f = f[f.length - 1].toLowerCase();
      if (
        f != 'pdf' &&
        f != 'mp3' &&
        f != 'xls' &&
        f != 'xlsx' &&
        f != 'docx'
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
    //image.event_image.split('.')[image.event_image.split('.').length-1]!='pdf'
  }

  checkmp4(f: any) {
    if (f) {
      let data = f.event_image != undefined ? f.event_image.split('.') : '';
      data =
        data != '' && data != undefined
          ? data[data.length - 1].toLowerCase()
          : '';
      if (data == 'mp4') {
        const urlParts = f['event_image'].split('/');
        const videoFilename = urlParts.pop();
        urlParts.push('thumb');
        const thumbnailFilename = videoFilename?.replace('.mp4', '.jpeg');
        urlParts.push(thumbnailFilename);
        f['thumbnail'] = urlParts.join('/');
        // f['thumbnail'] = this.select_datas['thumbnail'] != undefined && this.select_datas['thumbnail'] != ''? this.select_datas['thumbnail'] : '../../assets/imgs/appicon.png';
        if (f['videoClicked'] == undefined) {
          f['thumbnailBase64Image'] = true;
          f['videoClicked'] = false;
        }
        return true;
      } else {
        return false;
      }
    } else {
      f['thumbnail'] = '';
      if (f['videoClicked'] == undefined) {
        f['thumbnailBase64Image'] = true;
        f['videoClicked'] = false;
      }
      return true;
    }
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

  checkdocx(f: any) {
    if (f) {
      f = f.split('.');
      f = f[f.length - 1].toLowerCase();
      if (f == 'docx') {
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
      (err) => {}
    );
  }

  deletefile() {
    this.select_datas.type = '';
    this.select_datas.image = '';
    this.select_datas.filename = '';
  }

  formatPorts(classs: any) {
    return classs.map((port: any) => port.name).join(', ');
  }

  onSubmit1() {
    this.senditems1 = [];
    this.loading.present();
    this.authservice
      .post('searchgroupMessage', {
        Is_Admin: this.storage.getjson('teachersDetail')[0]['Is_Admin'],
        staff_id: this.storage.getjson('teachersDetail')[0]['staff_id'],
        classid: this.authservice.classids(),
        s_date: this.select_datas1.s_date,
      })
      .subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.senditems1 = res['senditem'];
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

  toggleMessage(id: any, message: any, image: any, i: any) {
    if (id != 'cancel' && id != 'confirm') {
      this.index = i;
      this.messageId = id;
      this.messageText = message;
      this.attachment = image;
    }
    if (id == 'confirm') {
      this.last3days[this.index].message = this.messageText;
      this.editMessage(this.messageId, this.messageText);
    }
    this.isEditMessageOpen = !this.isEditMessageOpen;
  }

  toggleMessage2() {
    this.isEditMessageOpen1 = !this.isEditMessageOpen1;
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

  /////////////////////////////
  async editMessage(id: any, message: any) {
    this.loading.present();
    this.authservice
      .post('editcirculars', { messageId: id, messageText: message })
      .subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.getgroupMessage();
          }
        },
        (err: any) => {
          this.loading.dismissAll();
        }
      );
  }

  //edit Circulars
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
        this.select_datas.type = '';
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

  loadVideo(data: any) {
    data.thumbnailBase64Image = false;
    data.videoClicked = true;
  }
}
