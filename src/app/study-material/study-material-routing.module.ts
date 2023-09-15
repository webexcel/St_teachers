import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import {StudyMaterialComponent} from './study-material.component';

const routes: Routes = [
  {
    path: '',
    component: StudyMaterialComponent
  },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StudyMaterialRoutingModule {}
