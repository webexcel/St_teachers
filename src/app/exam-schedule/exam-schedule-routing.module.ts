import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamScheduleComponent } from './exam-schedule.component';

const routes: Routes = [
  {
    path: '',
    component: ExamScheduleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamScheduleRoutingModule {}
