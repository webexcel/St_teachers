import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { TranModule } from 'src/app/tran.module';
import { FeeClassRoutingModule } from './fee-class-routing.module';
import { FeeClassComponent } from './fee-class.component';

@NgModule({
  declarations: [FeeClassComponent],
  imports: [CommonModule, FeeClassRoutingModule, IonicModule, TranModule],
})
export class FeeClassModule {}
