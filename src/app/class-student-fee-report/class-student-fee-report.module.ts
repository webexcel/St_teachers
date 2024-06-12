import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassStudentFeeReportPageRoutingModule } from './class-student-fee-report-routing.module';

import { ClassStudentFeeReportPage } from './class-student-fee-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassStudentFeeReportPageRoutingModule
  ],
  declarations: [ClassStudentFeeReportPage]
})
export class ClassStudentFeeReportPageModule {}
