import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { TranModule } from '../tran.module';
import { FlashRoutingModule } from './flash-routing.module';
import { FlashComponent } from './flash.component';
@NgModule({
  declarations: [FlashComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranModule,
    FormsModule,
    FlashRoutingModule,
    IonicSelectableComponent,
  ],
})
export class FlashModule {}
