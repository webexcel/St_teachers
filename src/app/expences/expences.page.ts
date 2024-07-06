import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';

@Component({
  selector: 'app-expences',
  templateUrl: './expences.page.html',
  styleUrls: ['./expences.page.scss'],
})
export class ExpencesPage implements OnInit {
  expenseDetails: any[] = []; totalExp: any; isStartPickerOpen: boolean = false; isEndPickerOpen: boolean = false; selectedDate: any;
  showStartDatePicker: boolean = false; showEndDatePicker: boolean = false; selectedStartDate: any = new Date().toISOString(); selectedEndDate: any = new Date().toISOString();

  constructor(public loading: LoadingService, public authservice: AuthService, private modal: ModalController, public toastController: ToastController) { }

  ngOnInit() {
    this.getExpenceDetails();
    this.initializeYears();
  }

  initializeYears() {

  }

  onTypeChange() {

  }

  async getExpenceDetails() {
    this.loading.present();
    this.authservice
      .post('getExpense', { "Is_Admin": "Y", "startDate": this.formatDate(this.selectedStartDate), "endDate": this.formatDate(this.selectedEndDate) })
      .subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.expenseDetails = res["data"];
            this.totalExp = 0;
            for (let i = 0; i < this.expenseDetails.length; i++) {
              this.totalExp += parseFloat(this.expenseDetails[i].amount);
            }
          } else {
            this.expenseDetails = [];
            this.totalExp = 0;
          }
        },
        (err: any) => {
          this.loading.dismissAll();
        }
      );
  }

  formatDate(date: any) {
    if (date != undefined && date != "" && (date).toString().indexOf("T") > -1) {
      const today = new Date(date);
      const yyyy = today.getFullYear();
      let mm = `${today.getMonth() + 1}`;
      let dd = `${today.getDate()}`;

      if (+dd < 10) {
        dd = '0' + dd;
      }
      if (+mm < 10) {
        mm = '0' + mm;
      }

      return dd + '-' + mm + '-' + yyyy;
    } else {
      return "";
    }

  }

  searchRecords() {
    this.getExpenceDetails();
  }

  cancel_date() {
    this.modal.dismiss();
  }

  confirm_date() {
    this.modal.dismiss();
  }

  toggleStartDateSelection() {
    this.isStartPickerOpen = !this.isStartPickerOpen;
  }

  showHideStartDatePicker() {
    this.showStartDatePicker = !this.showStartDatePicker;
  }

  toggleEndDateSelection() {
    this.isEndPickerOpen = !this.isEndPickerOpen;
  }

  showHideEndDatePicker() {
    this.showEndDatePicker = !this.showEndDatePicker;
  }

}
