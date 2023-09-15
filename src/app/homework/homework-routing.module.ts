import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import {HomeworkComponent} from './homework.component';

const routes: Routes = [
  {
    path: '',
    component: HomeworkComponent
  },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeworkRoutingModule {}
