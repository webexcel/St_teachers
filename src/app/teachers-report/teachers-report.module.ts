import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeachersReportPageRoutingModule } from './teachers-report-routing.module';

import { TeachersReportPage } from './teachers-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeachersReportPageRoutingModule
  ],
  declarations: [TeachersReportPage]
})
export class TeachersReportPageModule {}
