import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeStudentComponent } from './fee-student.component';

const routes: Routes = [
  {
    path: '',
    component: FeeStudentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeeStudentRoutingModule {}
