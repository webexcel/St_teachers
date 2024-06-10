import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { SelectModalComponent } from '../select-modal/select-modal.component';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.page.html',
  styleUrls: ['./uploads.page.scss'],
})
export class UploadsPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  ios: any = false;
  uploadItems: any;
  isModalOpen: any = false;
  modalData: any;
  classList: any;
  className: any;
  showDatePicker: boolean = false;
  selectedDate: any = new Date();
  message: any = '';
  attachedFileName: any;

  constructor(
    public loading: LoadingService,
    public authservice: AuthService,
    private modalController: ModalController,
    public storage: StorageService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.classList = this.storage.getjson('classlist');
  }

  ionViewDidEnter() {
    this.getUploadDetails();
  }

  async getUploadDetails() {
    this.loading.present();
    let classId = this.classList.filter((item: any) => item.classTeacher === "1");
    classId =
      classId.length > 0 &&
      classId[0] != undefined &&
      classId[0].id != undefined
        ? classId[0].id
        : undefined;
    if (classId == undefined) {
      this.loading.dismissAll();
      let alert = await this.alertCtrl.create({
        header: "SchoolTree Teachers",
        message: 'Your class is not available.',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      this.authservice.post('getVideoUploads', { classid: classId }).subscribe(
        (res: any) => {
          this.loading.dismissAll();
          this.uploadItems = res['data'] != undefined ? res['data'] : [];
          for (let i = 0; i < this.uploadItems.length; i++) {
            this.uploadItems[i]['videoClick'] = false;
          }
        },
        (err) => {
          this.loading.dismissAll();
        }
      );
    }
  }

  showVideo(index: any) {
    this.uploadItems[index].videoClick = true;
  }

  sendData(data: any) {
    this.modalData = data;
    this.isModalOpen = true;
    this.attachedFileName = data.url;
  }

  closeModal() {
    this.modalData = [];
    this.isModalOpen = false;
  }

  cancel(data: any) {
    data.videoClick = false;
    this.modalController.dismiss();
  }

  showHideDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

  async openOptions() {
    const modal = await this.modalController.create({
      component: SelectModalComponent,
      componentProps: {
        optionsList: this.classList,
        value: [],
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
      this.className =
        datar.length > 0
          ? datar.length + ' Classes Selected'
          : 'No Selected Classes';
    });
    return await modal.present();
  }

  submitData() {
    this.closeModal();
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

  onWillDismiss(event: Event, type: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'cancel') {
      if (type == 'first') {
        this.selectedDate = null;
      } else {
        this.selectedDate = null;
      }
    }
  }

  cancel_date() {
    this.modal.dismiss(null, 'confirm');
  }

  confirm_date() {
    this.modal.dismiss(null, 'confirm');
  }

  checkimage(fileData: any, index: any) {
    if (fileData) {
      fileData = fileData.split('.');
      fileData = fileData[fileData.length - 1].toLowerCase();
      if (
        fileData != 'pdf' &&
        fileData != 'mp3' &&
        fileData != 'xls' &&
        fileData != 'xlsx' &&
        fileData != 'docx' &&
        fileData != 'mp4'
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  checkmp4(fileData: any, index: any) {
    if (fileData) {
      let data = fileData.url != undefined ? fileData.url.split('.') : '';
      data =
        data != '' && data != undefined
          ? data[data.length - 1].toLowerCase()
          : '';
      if (data == 'mp4') {
        const urlParts = fileData['url'].split('/');
        const videoFilename = urlParts.pop();
        urlParts.push('thumb');
        const thumbnailFilename = videoFilename?.replace('.mp4', '.jpeg');
        urlParts.push(thumbnailFilename);
        fileData['thumbnail'] = urlParts.join('/');
        return true;
      } else {
        return false;
      }
    } else {
      fileData['thumbnail'] = '';
      return false;
    }
  }

  checkmp3(fileData: any) {
    if (fileData) {
      fileData = fileData.split('.');
      fileData = fileData[fileData.length - 1].toLowerCase();
      if (fileData == 'mp3') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  checkxls(fileData: any) {
    if (fileData) {
      fileData = fileData.split('.');
      fileData = fileData[fileData.length - 1].toLowerCase();
      if (fileData == 'xls' || fileData == 'xlsx') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  checkdocx(fileData: any) {
    if (fileData) {
      fileData = fileData.split('.');
      fileData = fileData[fileData.length - 1].toLowerCase();
      if (fileData == 'docx') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  checkpdf(fileData: any) {
    if (fileData) {
      fileData = fileData.split('.');
      fileData = fileData[fileData.length - 1].toLowerCase();
      if (fileData == 'pdf') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
