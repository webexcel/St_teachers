import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranModule } from '../tran.module';
import { ViewRemarksRoutingModule } from './view-remarks-routing.module';
import { ViewRemarksComponent } from './view-remarks.component';

@NgModule({
  declarations: [ViewRemarksComponent],
  imports: [
    CommonModule,
    ViewRemarksRoutingModule,
    IonicModule,
    TranModule,
    IonicSelectableComponent,
    FormsModule,
    TabsModule.forRoot(),
  ],
})
export class ViewRemarksModule {}
