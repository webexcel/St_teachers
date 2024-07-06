import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';

@Component({
  selector: 'app-staff-free-period',
  templateUrl: './staff-free-period.page.html',
  styleUrls: ['./staff-free-period.page.scss'],
})
export class StaffFreePeriodPage implements OnInit {
  staffFreePeriodDetails: any[] = []; day: any = ""; period: any = "";
  daysList = [
    { value: "MON", name: "MON" },
    { value: "TUE", name: "TUE" },
    { value: "WED", name: "WED" },
    { value: "THU", name: "THU" },
    { value: "FRI", name: "FRI" },
    { value: "SAT", name: "SAT" }
  ];
  periodsList = [
    { value: "I", name: "Period I" },
    { value: "II", name: "Period II" },
    { value: "III", name: "Period III" },
    { value: "IV", name: "Period IV" },
    { value: "V", name: "Period V" },
    { value: "VI", name: "Period VI" },
    { value: "VII", name: "Period VII" },
    { value: "VIII", name: "Period VIII" },
  ];


  constructor(public loading: LoadingService, public authservice: AuthService, private alertCtrl: AlertController,
    private toastController: ToastController) { }

  ngOnInit() {
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

  async getStaffFreeList() {
    if (this.day == undefined || this.day == "") {
      this.showToast("No Day Selected!", "danger");
    } else if (this.period == undefined || this.period == "") {
      this.showToast("No Period Selected!", "danger");
    } else {
      this.loading.present();
      this.authservice
        .post('getstafffreelist', { "dayid": this.day, "periodid": this.period })
        .subscribe(
          (res: any) => {
            this.loading.dismissAll();
            if (res['status']) {
              this.staffFreePeriodDetails = res["data"];
              this.day = "";
              this.period = "";
            }
          },
          (err: any) => {
            this.loading.dismissAll();
          }
        );
    }
  }

}
