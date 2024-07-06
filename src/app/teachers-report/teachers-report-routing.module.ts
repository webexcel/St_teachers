import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeachersReportPage } from './teachers-report.page';

const routes: Routes = [
  {
    path: '',
    component: TeachersReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachersReportPageRoutingModule {}
