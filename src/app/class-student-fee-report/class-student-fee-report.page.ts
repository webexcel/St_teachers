import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-class-student-fee-report',
  templateUrl: './class-student-fee-report.page.html',
  styleUrls: ['./class-student-fee-report.page.scss'],
})
export class ClassStudentFeeReportPage implements OnInit {
  TotalCollection: any;
  ClassTotalCollection: any;
  studentData: any;
  dataIsLoading = true;
  dataIsLoading1 = true;
  classlist: any[] = [];
  teacherDetail: any;

  constructor(
    private Router: Router,
    public authservice: AuthService,
    public storage: StorageService
  ) {
    this.teacherDetail = this.storage.getjson("teachersDetail");
    if (this.teacherDetail[0]["Is_Admin"] != 'Y') {
      let classId = this.storage.getjson("classlist").filter((item: any) => item.classTeacher === "1");
      classId = classId[0] != undefined && classId[0].id != undefined ? classId[0].id : "0";
      this.Router.navigate(['/class-student-fee-report/fee-class', classId]);
    }
    this.getClassList();
    this.getTotalCollection();
    this.getClassTotalCollection();
  }

  ngOnInit() { }

  // navigateToClass() {
  //   this.Router.navigate(['/fee-class']);
  // }

  getTotalCollection() {
    let detail = {
      staff_id: this.storage.getjson('teachersDetail')[0]['staff_id'],
    };
    this.authservice.post('getTotalCollection', detail).subscribe(
      (result) => {
        this.TotalCollection = result;
        this.dataIsLoading = false;

        if (this.TotalCollection.status) {
        }
      },
      (err) => {
        this.dataIsLoading = false;
      }
    );
  }

  getClassTotalCollection() {
    let detail = {
      staff_id: this.storage.getjson('teachersDetail')[0]['staff_id'],
    };
    this.authservice.post('getClassTotalCollection', detail).subscribe(
      (result) => {
        this.ClassTotalCollection = result;
        this.dataIsLoading1 = false;

        if (this.ClassTotalCollection.status) {
          this.studentData = this.ClassTotalCollection.Student_History.result;
        }
      },
      (err) => {
        this.dataIsLoading1 = false;
      }
    );
  }

  getClassList() {
    const storedData = localStorage.getItem('classlist');
    if (storedData) {
      this.classlist = JSON.parse(storedData);
    }
  }

  onClassClick(className: string) {
    const classItem = this.classlist.find((item) => item.name === className);

    if (classItem) {
      const classId = classItem.id;
      this.Router.navigate(['/class-student-fee-report/fee-class', classId]);
    }
  }
}
