import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemarksPage } from './remarks.page';

const routes: Routes = [
  {
    path: '',
    component: RemarksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemarksPageRoutingModule {}
