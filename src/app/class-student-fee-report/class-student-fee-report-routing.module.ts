import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassStudentFeeReportPage } from './class-student-fee-report.page';

const routes: Routes = [
  {
    path: '',
    component: ClassStudentFeeReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassStudentFeeReportPageRoutingModule {}
