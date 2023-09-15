import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import {CircularsComponent} from './circulars.component';

const routes: Routes = [
  {
    path: '',
    component: CircularsComponent
  },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CircularsRoutingModule {}
