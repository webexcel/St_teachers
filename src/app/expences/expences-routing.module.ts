import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpencesPage } from './expences.page';

const routes: Routes = [
  {
    path: '',
    component: ExpencesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpencesPageRoutingModule {}
