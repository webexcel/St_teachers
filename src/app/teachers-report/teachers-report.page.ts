import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { SelectModalComponent } from '../select-modal/select-modal.component';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-teachers-report',
  templateUrl: './teachers-report.page.html',
  styleUrls: ['./teachers-report.page.scss'],
})
export class TeachersReportPage implements OnInit {
  isReportRecord: boolean = false; isViewReportRecord: boolean = false; className: any; allRecords: any[] = []; subjects: any[] = []; periodName: any; subjectName: any;
  currentView: any; classList: any;

  periods = [
    { id: 'I', name: "I" }, { id: 'II', name: "II" }, { id: 'III', name: "III" }, { id: 'IV', name: "IV" }, { id: 'V', name: "V" }, { id: 'VI', name: "VI" },
    { id: 'VII', name: "VII" }, { id: 'VIII', name: "VIII" }
  ];
  actualReportRecord = {
    reportId: '0', date: new Date().toISOString(), classId: "", period: "", subject: "", Workdone: "", Smartclass: false, Description: "", isOptionsModalOpen: false,
    isViewModalOpen: false, className: "", subjectName: ""
  };

  constructor(private modal: ModalController, public loading: LoadingService, public authservice: AuthService, public storage: StorageService, public toastController: ToastController,
    public alertCtrl: AlertController) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    this.classList = this.storage.getjson("classlist");
    await this.getallsubject();
    await this.getStaffData();
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

  getStaffData() {
    let teacherDetail = this.storage.getjson("teachersDetail");
    let staffId = teacherDetail[0].staff_id;
    this.authservice.post('getStaffReport', { admin_Id: teacherDetail[0].Is_Admin, staff_Id: staffId }).subscribe(
      (res: any) => {
        this.loading.dismissAll();
        this.allRecords = res["data"];
        if (this.allRecords.length > 0) {
          for (let i = 0; i < this.allRecords.length; i++) {
            if (this.allRecords[i].Smartclass == "1" || this.allRecords[i].Smartclass == "true") {
              this.allRecords[i].Smartclass = true;
            } else {
              this.allRecords[i].Smartclass = false;
            }
            let className = this.classList.filter((item: any) => item.id === this.allRecords[i].classId);
            let subjectName = this.subjects.filter((item: any) => item.id === this.allRecords[i].subject);
            className.length > 0 ? this.allRecords[i]["className"] = className[0].name : this.allRecords[i]["className"] = "";
            subjectName.length > 0 ? this.allRecords[i]["subjectName"] = subjectName[0].name : this.allRecords[i]["subjectName"] = "";
            this.allRecords[i]["isOptionsModalOpen"] = false;
            this.allRecords[i]["isViewModalOpen"] = false;
          }
        }
        this.allRecords = this.allRecords;
      },
      (err) => {
        this.loading.dismissAll();
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
      }
    );
  }

  formatDate(date: any) {
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
    return yyyy + '-' + mm + '-' + dd;
  }

  toggleReportRecord(evt: any, index: any) {
    this.closeOptionsModal(evt, index);
    if (evt == "add" || evt == "edit") {
      if (evt == "add") {
        this.className = "No Selected Class";
        this.periodName = "No Selected Period";
        this.subjectName = "No Selected Subject";
        this.currentView = "add";
        this.actualReportRecord = {
          reportId: '0',
          date: new Date().toISOString(),
          classId: "",
          period: "",
          subject: "",
          Workdone: "",
          Smartclass: false,
          Description: "",
          isOptionsModalOpen: false,
          isViewModalOpen: false,
          className: "",
          subjectName: ""
        };
      }
      this.isReportRecord = true;
    } else if (evt == "view") {
      this.isViewReportRecord = true;
    }
  }

  cancelReportRecord(evt: any) {
    if (evt == "") {
      this.isReportRecord = false;
    } else if (evt == "view") {
      this.isViewReportRecord = false;
    }
  }

  saveReportRecord() {
    if (this.actualReportRecord.classId == undefined || this.actualReportRecord.classId == "") {
      this.showToast("No Class Seleted!", "danger");
    } else if (this.actualReportRecord.period == undefined || this.actualReportRecord.period == "") {
      this.showToast("No Period Selected!", "danger");
    } else if (this.actualReportRecord.subject == undefined || this.actualReportRecord.subject == "") {
      this.showToast("No Subject selected!", "danger");
    } else if (this.actualReportRecord.Workdone == undefined || this.actualReportRecord.Workdone == "") {
      this.showToast("Work-Done is Empty!", "danger");
    } else {
      if (this.currentView == "add") {
        let teacherDetail = this.storage.getjson("teachersDetail");
        let reqData = {
          'staff_Id': parseInt(teacherDetail[0].staff_id),
          'class_Id': parseInt(this.actualReportRecord.classId),
          'date': this.formatDate(this.actualReportRecord.date),
          'period': this.actualReportRecord.period,
          'subject': this.actualReportRecord.subject,
          'Workdone': this.actualReportRecord.Workdone,
          'smartclass': this.actualReportRecord.Smartclass,
          'Description': this.actualReportRecord.Description,
        };

        this.authservice.post('insertNewReport', reqData).subscribe(
          (res: any) => {
            if (res["status"] == true) {
              this.showToast(res["message"], "success");
            } else {
              this.showToast(res["message"], "danger");
            }
          },
          (err) => {
            this.showToast(err, "danger");
          }
        );
      } else if (this.currentView == "edit") {
        let teacherDetail = this.storage.getjson("teachersDetail");
        let reqData = {
          'report_Id': parseInt(this.actualReportRecord.reportId),
          'staff_Id': parseInt(teacherDetail[0].staff_id),
          'class_Id': parseInt(this.actualReportRecord.classId),
          'date': this.formatDate(this.actualReportRecord.date),
          'period': this.actualReportRecord.period,
          'subject': this.actualReportRecord.subject,
          'Workdone': this.actualReportRecord.Workdone,
          'smartclass': this.actualReportRecord.Smartclass,
          'Description': this.actualReportRecord.Description,
        };

        this.authservice.post('updateNewReport', reqData).subscribe(
          (res: any) => {
            if (res["status"] == true) {
              this.showToast(res["message"], "success");
            } else {
              this.showToast(res["message"], "danger");
            }
          },
          (err) => {
            this.showToast(err, "danger");
          }
        );
        this.actualReportRecord = {
          reportId: '0',
          date: new Date().toISOString(),
          classId: "",
          period: "",
          subject: "",
          Workdone: "",
          Smartclass: false,
          Description: "",
          isOptionsModalOpen: false,
          isViewModalOpen: false,
          className: "",
          subjectName: ""
        };
      }
      this.isReportRecord = false;
      this.getStaffData();
    }
  }

  async openOptions(data: any, value: any, type = '', multi = false) {
    const modal = await this.modal.create({
      component: SelectModalComponent,
      componentProps: {
        optionsList: data,
        value: value,
        multi: multi,
        parameters: ['id', 'name'],
      },
    });

    modal.onDidDismiss().then((result) => {
      if (type == "class") {
        this.actualReportRecord.classId = result.data.id;
        this.className = result.data.name ? result.data.name + ' Classes Selected' : 'No Selected Class';
      } else if (type == "period") {
        this.actualReportRecord.period = result.data.id;
        this.periodName = result.data.name ? result.data.name + ' Period Selected' : 'No Selected Period';
      } else if (type == "subject") {
        this.actualReportRecord.subject = result.data.id;
        this.subjectName = result.data.name ? result.data.name + ' Subject Selected' : 'No Selected Subject';
      }
    });
    return await modal.present();
  }

  presentButtons(index: any) {
    this.allRecords[index].isOptionsModalOpen = true;
  }

  editAction(index: any) {
    this.currentView = "edit";
    if (this.allRecords[index].Smartclass == "1" || this.allRecords[index].Smartclass == "true") {
      this.allRecords[index].Smartclass = true;
    } else {
      this.allRecords[index].Smartclass = false;
    }
    this.actualReportRecord = this.allRecords[index];
    this.className = this.allRecords[index].className ? this.allRecords[index].className + ' Classes Selected' : 'No Selected Classes';
    this.periodName = this.allRecords[index].period ? this.allRecords[index].period + ' Period Selected' : 'No Selected Period';
    this.subjectName = this.allRecords[index].subjectName ? this.allRecords[index].subjectName + ' Subject Selected' : 'No Selected Subject';
    this.toggleReportRecord('edit', index);
  }

  viewAction(index: any) {
    this.currentView = "view";
    this.actualReportRecord = this.allRecords[index];
    this.allRecords[index].isViewModalOpen = true;
    this.toggleReportRecord('view', index);
  }

  async deleteAction(index: any) {
    let alert = await this.alertCtrl.create({
      header: 'SchoolTree Teachers',
      message: 'Do you want to delete this report?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.closeOptionsModal("delete", index);
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.closeOptionsModal("delete", index);
            let teacherDetail = this.storage.getjson("teachersDetail");
            let reqData = {
              "report_Id": this.allRecords[index].reportId,
              "staff_Id": parseInt(teacherDetail[0].staff_id)
            }
            this.authservice.post('deleteNewReport', reqData).subscribe(
              (res: any) => {
                if (res["status"] == true) {
                  this.showToast(res["message"], "success");
                  this.getStaffData();
                } else {
                  this.showToast(res["message"], "danger");
                }
              },
              (err) => {
                this.showToast(err, "danger");
              }
            );
          },
        },
      ],
    });
    await alert.present();
  }

  closeOptionsModal(evt: any, index: any) {
    if (index != '-1') {
      this.allRecords[index].isOptionsModalOpen = false;
      this.allRecords[index].isViewModalOpen = false;
    }
  }
}
