import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeReportComponent } from './fee-report.component';

const routes: Routes = [
  {
    path: '',
    component: FeeReportComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeeReportRoutingModule {}
