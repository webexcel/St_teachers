import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarkEnterPage } from './mark-enter.page';

const routes: Routes = [
  {
    path: '',
    component: MarkEnterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarkEnterPageRoutingModule {}
