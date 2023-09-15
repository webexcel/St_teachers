import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import {ReportCardComponent} from './report-card.component';

const routes: Routes = [
  {
    path: '',
    component: ReportCardComponent
  },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ReportCardRoutingModule {}
