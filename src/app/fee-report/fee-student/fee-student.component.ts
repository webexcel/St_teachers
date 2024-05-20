import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-fee-student',
  templateUrl: './fee-student.component.html',
  styleUrls: ['./fee-student.component.scss'],
})
export class FeeStudentComponent implements OnInit {
  ios: any = false;
  classId: any;
  studentId: any;
  studentReport: any;
  studentFeeDetails: any;
  studentFeeHistory: any;
  feeHistory: any[] = [];
  totalVal = 0;
  totalPaid = 0;
  totalCon = 0;

  constructor(private route: ActivatedRoute, public authservice: AuthService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.classId = params.get('classId');
      this.studentId = params.get('studentId');
    });
    this.getstudentpayHistory();
  }

  getstudentpayHistory() {
    const details = {
      class_Id: this.classId,
      adno: this.studentId,
    };
    this.authservice.post('getstudentpayHistory', details).subscribe(
      (result) => {
        this.studentReport = result;

        if (this.studentReport.status) {
          this.studentFeeDetails =
            this.studentReport.Student_History.Feedetails;
          this.studentFeeHistory =
            this.studentReport.Student_History.FEE_HISTORY;

          const admissionNumber = this.studentId;
          this.feeHistory = this.studentFeeHistory[0];
          this.studentFeeDetails.map((data: any) => {
            this.totalVal = this.totalVal + Number(data.Total_Amount);
            this.totalPaid = this.totalPaid + Number(data.PaidAmount);
            this.totalCon = this.totalCon + Number(data.totalCon);
          });
        }
      },
      (err) => {}
    );
  }
}
