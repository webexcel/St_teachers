import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-fee-report',
  templateUrl: './fee-report.component.html',
  styleUrls: ['./fee-report.component.scss'],
})
export class FeeReportComponent implements OnInit {
  TotalCollection: any;
  ClassTotalCollection: any;
  studentData: any;
  dataIsLoading = true;
  dataIsLoading1 = true;
  classlist: any[] = [];

  constructor(
    private Router: Router,
    public authservice: AuthService,
    public storage: StorageService
  ) {
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
      this.Router.navigate(['/fee-report/fee-class', classId]);
    }
  }
}
