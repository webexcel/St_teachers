import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { ReportDetailsComponent } from '../report-details/report-details.component';
import { ReportFormsComponent } from '../report-forms/report-forms.component';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';
import { TranslateConfigService } from '../service/translate-config.service';
@Component({
  selector: 'app-daily-reports',
  templateUrl: './daily-reports.component.html',
  styleUrls: ['./daily-reports.component.scss'],
})
export class DailyReportsComponent implements OnInit {
  ios: any = false;
  otherReports: any;
  myReports: any;
  listType: any = 1;
  @ViewChild(IonModal)
  message: any;
  modal!: IonModal;
  formData: any;
  isModalOpen = false;
  oneItem: any;
  constructor(
    public authservice: AuthService,
    private translate: TranslateConfigService,
    public loading: LoadingService,
    private modalCtrl: ModalController
  ) {
    this.formData = [
      {
        staff_id: 1,
        date: '20-10-2023',
        day: 'Monday',
        arrival: '5.00 pm',
        period1: 'test1',
        period2: 'test2',
        period3: 'test3',
        period4: 'test4',
        period5: 'test5',
        period6: 'test6',
        period7: 'test7',
        period8: 'test8',
        period9: 'test9',
        period10: 'test10',
        dispersal: 'Yes',
        after_dispersal: 'TTT',
        parent_met: 'RRR',
        stu_dis_issues: 'FFF',
        chronic_late: 'DD',
        chronic_default: 'WWW',
      },
      {
        staff_id: 1,
        date: '21-10-2023',
        day: 'Tuesday',
        arrival: '5.00 pm',
        period1: 'test1',
        period2: 'test2',
        period3: 'test3',
        period4: 'test4',
        period5: 'test5',
        period6: 'test6',
        period7: 'test7',
        period8: 'test8',
        period9: 'test9',
        period10: 'test10',
        dispersal: 'Yes',
        after_dispersal: 'TTT',
        parent_met: 'RRR',
        stu_dis_issues: 'FFF',
        chronic_late: 'DD',
        chronic_default: 'WWW',
      },
      {
        staff_id: 1,
        date: '22-10-2023',
        day: 'Wednesday',
        arrival: '5.00 pm',
        period1: 'test1',
        period2: 'test2',
        period3: 'test3',
        period4: 'test4',
        period5: 'test5',
        period6: 'test6',
        period7: 'test7',
        period8: 'test8',
        period9: 'test9',
        period10: 'test10',
        dispersal: 'Yes',
        after_dispersal: 'TTT',
        parent_met: 'RRR',
        stu_dis_issues: 'FFF',
        chronic_late: 'DD',
        chronic_default: 'WWW',
      },
    ];
  }

  ngOnInit() {
    this.ios = this.authservice.isiso();
    this.translate.set();
  }
  segmentChanged(ev: any) {
    //console.log(ev)
    let val = ev.detail.value;
    this.listType = val;
    if (val == 1) {
      this.getMyList('ID');
    } else {
      this.getOtherList('type');
    }
  }

  getOtherList(TYPE: any) {
    // this.loading.present();
    // this.authservice.post('getOtherReports', { type: TYPE }).subscribe(
    //   (res: any) => {
    //     this.otherReports = res.data;
    //     this.loading.dismissAll();
    //   },
    //   (err) => {
    //     this.loading.dismissAll();
    //   }
    // );
  }
  getMyList(ID: any) {
    // this.loading.present();
    // this.authservice.post('getMyReports', { id: ID }).subscribe(
    //   (res: any) => {
    //     this.myReports = res.data;
    //     this.loading.dismissAll();
    //   },
    //   (err) => {
    //     this.loading.dismissAll();
    //   }
    // );
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ReportFormsComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.formData.push(data);
      // this.loading.present();
      // this.authservice.post('activityTeacherInsert', this.formData).subscribe(
      //   (res: any) => {
      //     this.loading.dismissAll();
      //     if (res['status']) {
      //       console.log('resultttt', res);
      //     }
      //   },
      //   (err) => {
      //     this.loading.dismissAll();
      //     console.log(err);
      //   }
      // );
    }
  }

  async openModalDetails(item: any) {
    console.log('open modal');
    const modal = await this.modalCtrl.create({
      component: ReportDetailsComponent,
      componentProps: {
        data: item,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.formData.push(data);
      // this.loading.present();
      // this.authservice.post('activityTeacherInsert', this.formData).subscribe(
      //   (res: any) => {
      //     this.loading.dismissAll();
      //     if (res['status']) {
      //       console.log('resultttt', res);
      //     }
      //   },
      //   (err) => {
      //     this.loading.dismissAll();
      //     console.log(err);
      //   }
      // );
    }
  }

  setOpen(isOpen: boolean, data: any) {
    this.isModalOpen = isOpen;
    this.oneItem = data;
  }
}
