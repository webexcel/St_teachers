import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranModule } from '../tran.module';
import { StaffGroupRoutingModule } from './staff-group-routing.module';
import { StaffGroupComponent } from './staff-group.component';

@NgModule({
  declarations: [StaffGroupComponent],
  imports: [
    CommonModule,
    StaffGroupRoutingModule,
    IonicModule,
    TranModule,
    IonicSelectableModule,
    FormsModule,
    TabsModule.forRoot(),
  ],
})
export class StaffGroupModule {}
