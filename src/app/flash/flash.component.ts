import { Component, OnInit, ViewChild } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
// import { IonicSelectableComponent } from 'ionic-selectable';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { AlertController, IonModal, Platform, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';
import { VideoProcessingService } from '../service/video-processing-service';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss'],
})
export class FlashComponent implements OnInit {
  @ViewChild('portComponent', { static: false }) portComponent: any;
  classs: any = [];
  details: any = {};
  error: any = false;
  flashlist: any = [];
  showDatePicker: boolean = false;
  @ViewChild(IonModal)
  modal!: IonModal;
  isPickerOpen: boolean = false;
  fileAttached: boolean = false;
  isStartDatePickerOpen: boolean = false;
  isEndDatePickerOpen: boolean = false;
  startdate: any;
  enddate: any;

  constructor(
    public alertCtrl: AlertController,
    private sanitizer: DomSanitizer,
    private filePath: FilePath,
    public base64: Base64,
    public loading: LoadingService,
    public authservice: AuthService,
    public storage: StorageService,
    private platform: Platform,
    private router: Router,
    private fileChooser: FileChooser,
    private toastController: ToastController,
    private videoService: VideoProcessingService,
    private file: File,
    private fileOpener: FileOpener,
  ) {
    this.platform.backButton.subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  ngOnInit() {
    this.startdate = new Date().toISOString();
    this.enddate = new Date().toISOString();
    this.classs = this.storage.getjson('classlist');
    this.details.staff_code =
      this.storage.getjson('teachersDetail')[0]['staff_id'];
    this.details.enddate = new Date().toISOString();
    this.details.startdate = new Date().toISOString();
    this.details.image = '';
    this.details.type = '';
    this.flashmessage();
    // this.reset();
  }

  // reset() {
  //   this.details;
  // }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'middle'
    });
    toast.present();
  }

  flashmessage() {
    let flashmes;

    this.loading.present();
    this.authservice.post('getflashmessage', {}).subscribe(
      (result: any) => {
        this.loading.dismissAll();
        flashmes = result;
        if (flashmes.status) {
          this.flashlist = flashmes.data;
          var i = 0;
          for (i = 0; i < this.flashlist.length; i++) {
            this.flashlist[i].Discription = this.authservice.extractUrl(
              this.flashlist[i].Discription
            );
          }
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

  open1() {
    this.fileChooser
      .open()
      .then((uri) => {
        this.filePath.resolveNativePath(uri).then(
          (res) => {
            let l: any = res.split('.');
            l = l[l.length - 1].toLowerCase();
            if (l == 'jpg' || l == 'jpeg' || l == 'png') {
              this.details.type = l;
              this.error = false;
              l = `data:image/${l};base64,`;
              this.base64.encodeFile(res).then(
                (res) => {
                  this.details.image = this.sanitizer.bypassSecurityTrustUrl(
                    l + res.split('ase64,')[1]
                  );
                },
                (err) => { }
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

  open() {
    this.videoService
      .promptForVideo()
      .then((videoFile) => {
        if (videoFile.type.startsWith('video/')) {
          if (videoFile.size > 5 * 1024 * 1024) {
            this.showToast(`File size exceeds 5 MB limit.`, "danger");
            return;
          }
          this.videoService.uploadVideo(this.details, videoFile);
          this.videoService
            .generateThumbnail(videoFile)
            .then((thumbnailData) => {
              this.details['thumbnail'] = thumbnailData;
            })
            .catch((error) => {
              console.error('Error generating thumbnail:', error);
            });
        }
        const reader = new FileReader();
        reader.onload = async (e: any) => {
          this.details.image = e.target.result;
          this.details["imageName"] = videoFile.name;
          this.details.type = videoFile.name.split('.').pop();
          if (this.details['thumbnail'] == undefined) {
            this.details['thumbnail'] = '';
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

  onSubmit() {
    if (this.details.title == undefined || this.details.title == "") {
      this.showToast("Title is Empty!", "danger");
    } else if (this.details.description == undefined || this.details.description == "") {
      this.showToast("Description is Empty!", "danger");
    } else {
      this.loading.present();
      this.authservice.post('saveflase', this.details).subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.showToast("Flash Message Save Successfully.", "success");
            this.flashmessage();
            this.reset();
          }
        },
        (err) => {
          this.loading.dismissAll();
        }
      );
    }
  }

  reset() {
    this.details.title = '';
    this.details.description = '';
    this.startdate = new Date().toISOString();
    this.enddate = new Date().toISOString();
    this.details.startdate = new Date().toISOString();
    this.details.enddate = new Date().toISOString();
    this.details.image = '';
    this.details.type = '';
    this.error = false;
  }

  delete(id: any) {
    this.loading.present();
    this.authservice.post('deleteflase', { nid: id }).subscribe(
      (res: any) => {
        this.loading.dismissAll();
        if (res['status']) {
          this.flashmessage();
          this.showToast('Flash deleted  Successfully', "success");
        }
      },
      (err) => {
        this.loading.dismissAll();
      }
    );
  }

  deletefile() {
    this.details.image = '';
    this.details.type = '';
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

  confirm_date(evt: any) {
    if (evt == "start") {
      if (new Date(this.startdate) <= new Date(this.details.enddate)) {
        this.details.startdate = this.startdate;
        this.isStartDatePickerOpen = false;
      } else {
        this.showToast("Start Date should be lesser than or equal to End Date!", "danger");
      }
    } else if (evt == "end") {
      if (new Date(this.details.startdate) <= new Date(this.enddate)) {
        this.details.enddate = this.enddate;
        this.isEndDatePickerOpen = false;
      } else {
        this.showToast("End Date should be greater than or equal to Start Date!", "danger");
      }
    }
  }

  toggleDateSelect(evt: any) {
    if (evt == 'start') {
      this.isStartDatePickerOpen = !this.isStartDatePickerOpen;
    } else if (evt == "end") {
      this.isEndDatePickerOpen = !this.isEndDatePickerOpen;
    }
  }

  toggleDateSelection() {
    this.isPickerOpen = !this.isPickerOpen;
  }

  onWillDismiss(event: Event, type: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'cancel') {
      if (type == 'first') {
        this.details.startdate = null;
      } else {
        this.details.enddate = null;
      }
    }
    if (type == 'first') {
      this.startdate = this.details.startdate;
      this.isStartDatePickerOpen = false;
    } else {
      this.enddate = this.details.enddate;
      this.isEndDatePickerOpen = false;
    }
  }
}
