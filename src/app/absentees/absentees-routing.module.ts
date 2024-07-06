import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbsenteesPage } from './absentees.page';

const routes: Routes = [
  {
    path: '',
    component: AbsenteesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbsenteesPageRoutingModule {}
