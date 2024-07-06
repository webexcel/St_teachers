import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-absentees',
  templateUrl: './absentees.page.html',
  styleUrls: ['./absentees.page.scss'],
})
export class AbsenteesPage implements OnInit {
  abcenteesDetails: any[] = []; teacherDetail: any; isPickerOpen: boolean = false; showDatePicker: boolean = false; selectedDate: any = new Date().toISOString();

  constructor(public loading: LoadingService, public authservice: AuthService, public storage: StorageService, public modal: ModalController) { }

  ngOnInit() {
    this.getAbcenteesDetails();
  }

  async getAbcenteesDetails() {
    this.loading.present();
    this.teacherDetail = this.storage.getjson("teachersDetail");
    let classId: any = "3";
    if (this.teacherDetail[0]["Is_Admin"] != 'Y') {
      classId = this.storage.getjson("classlist").filter((item: any) => item.classTeacher === "1");
      classId = classId[0] != undefined && classId[0].id != undefined ? classId[0].id : "3";
    }
    this.authservice
      .post('getAbsentees', { "Is_Admin": this.teacherDetail[0]["Is_Admin"], "Class_Id": classId, "abstDate": this.formatDate(this.selectedDate) })
      .subscribe(
        (res: any) => {
          this.loading.dismissAll();
          if (res['status']) {
            this.abcenteesDetails = res["data"];
          } else {
            this.abcenteesDetails = [];
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

  cancel_date() {
    this.modal.dismiss();
  }

  confirm_date() {
    this.modal.dismiss();
    this.getAbcenteesDetails();
  }

  toggleDateSelection() {
    this.isPickerOpen = !this.isPickerOpen;
  }

  showHideDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

}
