import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranModule } from '../tran.module';
import { CircularsRoutingModule } from './circulars-routing.module';
import { CircularsComponent } from './circulars.component';

@NgModule({
  declarations: [CircularsComponent],
  imports: [
    CommonModule,
    CircularsRoutingModule,
    IonicModule,
    TranModule,
    IonicSelectableComponent,
    FormsModule,
    TabsModule.forRoot(),
  ],
})
export class CircularsModule {}
