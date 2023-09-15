import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranModule } from '../tran.module';
import { HomeworkRoutingModule } from './homework-routing.module';
import { HomeworkComponent } from './homework.component';

@NgModule({
  declarations: [HomeworkComponent],
  imports: [
    CommonModule,
    HomeworkRoutingModule,
    IonicModule,
    TranModule,
    IonicSelectableModule,
    FormsModule,
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
  ],
})
export class HomeworkModule {}
