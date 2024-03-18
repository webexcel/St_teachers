import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewRemarksComponent } from './view-remarks.component';

const routes: Routes = [
  {
    path: '',
    component: ViewRemarksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRemarksRoutingModule {}
