import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonModal,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { FlashComponent } from '../flash/flash.component';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';
import { TranslateConfigService } from '../service/translate-config.service';

@Component({
  selector: 'app-daily-reports',
  templateUrl: './daily-reports.component.html',
  styleUrls: ['./daily-reports.component.scss'],
})
export class DailyReportsComponent implements OnInit {
  public alertButtons = ['OK'];
  public lengthOfData: any;
  public alertInputs = [
    {
      placeholder: 'Name',
    },
    {
      placeholder: 'Nickname (max 8 characters)',
      attributes: {
        maxlength: 8,
      },
    },
    {
      type: 'number',
      placeholder: 'Age',
      min: 1,
      max: 100,
    },
    {
      type: 'textarea',
      placeholder: 'A little about yourself',
    },
  ];
  otherReports: any;
  myReports: any;
  listType: any = 1;
  @ViewChild(IonModal)
  message: any;
  modal!: IonModal;
  formData: any;
  formData1: any;
  isModalOpen = false;
  oneItem: any;
  s_date: any = 'all';
  e_date: any = 'all';
  staff_id: any;
  enable_filter: any = false;
  showDatePicker: boolean = false;
  staffData: any;
  level: any;
  levelType: any;
  isReportOpen: boolean = false;

  constructor(
    public authservice: AuthService,
    private translate: TranslateConfigService,
    public loading: LoadingService,
    private modalCtrl: ModalController,
    public storage: StorageService,
    public actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.staff_id = this.storage.getjson('teachersDetail')[0]['staff_id'];

    this.getLevel(this.staff_id);
    this.translate.set();
  }

  ngOnInit() { }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'middle'
    });
    toast.present();
  }

  getLevel(ID: any) {
    this.loading.present();
    this.authservice
      .post('getTeacherLevel', {
        staff_code: ID,
      })
      .subscribe(
        (res: any) => {
          this.staffData = res.data;
          this.levelType =
            this.staffData != undefined &&
              this.staffData[0] != undefined &&
              this.staffData[0].Is_Admin != undefined
              ? this.staffData[0].Is_Admin
              : '';
          if (this.levelType == 'N') {
            this.level = 4;
          } else if (this.levelType == 'I') {
            this.level = 3;
          } else if (this.levelType == 'Y') {
            this.level = 2;
          } else {
            this.level = 1;
          }
          this.getMyList(this.staff_id);
          this.loading.dismissAll();
        },
        (err) => {
          this.loading.dismissAll();
        }
      );
  }
  reset() {
    this.s_date = 'all';

    this.e_date = 'all';
  }
  segmentChanged(ev: any) {
    this.s_date = 'all';
    this.e_date = 'all';
    this.enable_filter = false;
    let val = ev.detail.value;
    this.listType = val;
    if (val == 1) {
      this.getMyList(this.staff_id);
    } else {
      this.getOtherList(this.staff_id);
    }
  }
  getData() {
    var date_arr: any = [];
    var date_arr1: any = [];

    date_arr = this.s_date.split(':');
    date_arr1 = this.e_date.split(':');

    if (date_arr.length > 1) {
      this.s_date = 'all';
    }
    if (date_arr1.length > 1) {
      this.e_date = 'all';
    }
    if (this.listType == 1) {
      this.getMyList(this.staff_id);
    } else {
      this.getOtherList('type');
    }
  }
  getOtherList(ID: any) {
    this.loading.present();
    this.authservice
      .post('getOtherTeacherReports', {
        staff_id: ID,
        s_date: this.s_date,
        e_date: this.e_date,
        level: this.level,
      })
      .subscribe(
        (res: any) => {
          this.otherReports = res.data;
          this.loading.dismissAll();
        },
        (err) => {
          this.loading.dismissAll();
        }
      );
  }
  getMyList(ID: any) {
    this.loading.present();
    this.authservice
      .post('getactivityTeacher', {
        staff_id: ID,
        s_date: this.s_date,
        e_date: this.e_date,
        level: this.level,
      })
      .subscribe(
        (res: any) => {
          this.formData = res.data;
          if (this.level == 2 || this.level == 1) {
            this.formData1 = res.data1;
            this.lengthOfData = this.formData.length + this.formData1.length;
          }
          this.loading.dismissAll();
        },
        (err) => {
          this.loading.dismissAll();
        }
      );
  }
  async openModal(type: any, item: any) {
    const modal = await this.modalCtrl.create({
      component: FlashComponent,
      componentProps: {
        type: type,
        data: item,
        level: this.level,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      if (type == 'new') {
        data.value.staff_id = this.staff_id;
        data.value.level = this.level;
        this.loading.present();
        this.authservice.post('activityTeacherInsert', data.value).subscribe(
          (res: any) => {
            this.loading.dismissAll();
            if (res['status']) {
            }
            this.getMyList(this.staff_id);
          },
          (err) => {
            this.loading.dismissAll();
          }
        );
      } else {
        this.loading.present();
        data.value.id = item.id;
        data.value.level = this.level;
        data.value.staff_id = this.staff_id;
        this.authservice.post('updateactivityTeacher', data.value).subscribe(
          (res: any) => {
            this.loading.dismissAll();
            if (res['status']) {
              this.getMyList(this.staff_id);
            }
          },
          (err) => {
            this.loading.dismissAll();
          }
        );
      }
    }
  }

  async openModalDetails(item: any) {
    const modal = await this.modalCtrl.create({
      component: FlashComponent,
      componentProps: {
        data: item,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.formData.push(data);
      this.loading.present();
      this.authservice.post('activityTeacherInsert', this.formData).subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
          }
        },
        (err) => {
          this.loading.dismissAll();
        }
      );
    } else {
      this.loading.dismissAll();
    }
  }

  setOpen(isOpen: boolean, data: any) {
    this.isModalOpen = isOpen;
    this.oneItem = data;
  }
  setOpenClose(isOpen: boolean) {
    this.isModalOpen = isOpen;
    // this.enable_filter = isOpen;
    // this.oneItem = data;
  }
  filterDetails() {
    this.enable_filter = !this.enable_filter;
  }
  async expandMessageOptions(item: any, index: any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Reports',
      buttons: [
        {
          text: 'View',
          icon: 'eye',
          handler: () => {
            this.setOpen(true, item);
            // this.newEOD('view', item,index);
          },
        },
        {
          text: 'Edit',
          icon: 'create',
          handler: () => {
            this.openModal('edit', item);
            // this.newEOD('edit', item, index);
          },
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.loading.present();
            this.authservice.post('activityTeacherDelete', item).subscribe(
              (res: any) => {
                this.loading.dismissAll();
                if (res['status']) {
                }
              },
              (err) => {
                this.loading.dismissAll();
              }
            );
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
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
  showHideDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }
  toggleMessage() {
    this.isReportOpen = !this.isReportOpen;
  }
}
