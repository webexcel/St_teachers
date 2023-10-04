import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranModule } from '../tran.module';
import { DailyReportsRoutingModule } from './daily-reports-routing.module';
import { DailyReportsComponent } from './daily-reports.component';
@NgModule({
  declarations: [DailyReportsComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranModule,
    IonicSelectableComponent,
    FormsModule,
    TabsModule.forRoot(),
    DailyReportsRoutingModule,
  ],
})
export class DailyReportsModule {}
