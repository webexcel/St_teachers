import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private Router: Router,
    public authservice: AuthService,
    public storage: StorageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.classId = params.get('classId');
      if (this.classId) {
      }
    });
    this.getClasswiseFeeDetails();
  }

  getClasswiseFeeDetails() {
    const details = {
      class_Id: this.classId,
    };
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

  onStudentClick(ADMISSION_ID: any): void {
    this.Router.navigate(['/fee-report/fee-student', this.classId, ADMISSION_ID]);
  }
}
