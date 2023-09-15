import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import {StaffGroupComponent} from './staff-group.component';

const routes: Routes = [
  {
    path: '',
    component: StaffGroupComponent
  },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StaffGroupRoutingModule {}
