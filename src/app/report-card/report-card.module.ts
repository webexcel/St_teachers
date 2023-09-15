import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { TranModule } from '../tran.module';
import { ReportCardRoutingModule } from './report-card-routing.module';
import { ReportCardComponent } from './report-card.component';

@NgModule({
  declarations: [ReportCardComponent],
  imports: [
    CommonModule,
    ReportCardRoutingModule,
    IonicModule,
    TranModule,
    IonicSelectableComponent,
    FormsModule,
  ],
})
export class ReportCardModule {}
