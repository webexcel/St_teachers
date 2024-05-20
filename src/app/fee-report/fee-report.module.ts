import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { TranModule } from '../tran.module';
import { FeeReportRoutingModule } from './fee-report-routing.module';
import { FeeReportComponent } from './fee-report.component';

@NgModule({
  declarations: [FeeReportComponent],
  imports: [CommonModule, FeeReportRoutingModule, IonicModule, TranModule],
})
export class FeeReportModule {}
