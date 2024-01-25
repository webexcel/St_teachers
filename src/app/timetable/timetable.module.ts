import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranModule } from '../tran.module';
import { TimetableRoutingModule } from './timetable-routing.module';
import { TimetableComponent } from './timetable.component';

@NgModule({
  declarations: [TimetableComponent],
  imports: [
    CommonModule,
    TimetableRoutingModule,
    IonicModule,
    TranModule,
    IonicSelectableComponent,
    FormsModule,
    TabsModule.forRoot(),
  ],
})
export class TimetableModule {}
