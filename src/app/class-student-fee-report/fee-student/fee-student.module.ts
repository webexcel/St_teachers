import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { TranModule } from 'src/app/tran.module';
import { FeeStudentRoutingModule } from './fee-student-routing.module';
import { FeeStudentComponent } from './fee-student.component';

@NgModule({
  declarations: [FeeStudentComponent],
  imports: [CommonModule, FeeStudentRoutingModule, IonicModule, TranModule],
})
export class FeeStudentModule {}
