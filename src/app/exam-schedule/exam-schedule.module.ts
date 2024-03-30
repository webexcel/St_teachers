import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ExamScheduleRoutingModule } from './exam-schedule-routing.module';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { TranModule } from '../tran.module';
import { ExamScheduleComponent } from './exam-schedule.component';
@NgModule({
  declarations: [ExamScheduleComponent],
  imports: [
    CommonModule,
    ExamScheduleRoutingModule,
    IonicModule,
    TranModule,
    IonicSelectableComponent,
    FormsModule,
  ],
})
export class ExamScheduleModule {}
