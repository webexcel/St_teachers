import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffFreePeriodPage } from './staff-free-period.page';

const routes: Routes = [
  {
    path: '',
    component: StaffFreePeriodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffFreePeriodPageRoutingModule {}
