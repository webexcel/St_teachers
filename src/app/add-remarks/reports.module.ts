import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranModule } from '../tran.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    IonicModule,
    TranModule,
    IonicSelectableComponent,
    FormsModule,
    TabsModule.forRoot(),
  ],
})
export class ReportsModule {}
