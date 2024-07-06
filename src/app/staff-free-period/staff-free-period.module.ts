import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffFreePeriodPageRoutingModule } from './staff-free-period-routing.module';

import { StaffFreePeriodPage } from './staff-free-period.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffFreePeriodPageRoutingModule
  ],
  declarations: [StaffFreePeriodPage]
})
export class StaffFreePeriodPageModule {}
