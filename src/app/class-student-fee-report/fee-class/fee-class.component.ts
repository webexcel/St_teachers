import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-fee-class',
  templateUrl: './fee-class.component.html',
  styleUrls: ['./fee-class.component.scss'],
})
export class FeeClassComponent implements OnInit {
  classReport: any;
  classId: any;
  classRecord: any;
  studentsList: any;
  isAdmin: any;
  teacherDetail: any;

  constructor(
    private Router: Router,
    public authservice: AuthService,
    public storage: StorageService,
    private route: ActivatedRoute,
    private alertCtrl: AlertController
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.classId = params.get('classId');
    });
  }

  ionViewWillEnter() {
    this.teacherDetail = this.storage.getjson("teachersDetail");
    this.isAdmin = this.teacherDetail[0].Is_Admin;
    if (this.isAdmin != "Y") {
      let classId = this.storage.getjson("classlist").filter((item: any) => item.classTeacher === "1");
      this.classId = classId[0] != undefined && classId[0].id != undefined && classId[0].id != "" ? classId[0].id : "0";
    }
    this.getClasswiseFeeDetails();
  }

  async getClasswiseFeeDetails() {
    const details = {
      class_Id: this.classId,
    };
    if (this.classId == "0") {
      let alert = await this.alertCtrl.create({
        header: "SchoolTree Teachers",
        message: "Students not found in this class.",
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          },
        ],
      });
      await alert.present();
    } else {
      this.authservice.post('getClasswiseFeeDetails', details).subscribe(
        (result) => {
          this.classReport = result;

          if (this.classReport.status) {
            this.classRecord = this.classReport.data;
          }
        },
        (err) => { }
      );
    }
  }

  onStudentClick(ADMISSION_ID: any): void {
    this.Router.navigate(['/class-student-fee-report/fee-student', this.classId, ADMISSION_ID]);
  }
}
