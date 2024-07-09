import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemarksPageRoutingModule } from './remarks-routing.module';

import { TranModule } from '../tran.module';
import { RemarksPage } from './remarks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemarksPageRoutingModule,
    TranModule
  ],
  declarations: [RemarksPage]
})
export class RemarksPageModule { }
