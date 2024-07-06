import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarkEnterPageRoutingModule } from './mark-enter-routing.module';

import { TranModule } from '../tran.module';
import { MarkEnterPage } from './mark-enter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarkEnterPageRoutingModule,
    TranModule
  ],
  declarations: [MarkEnterPage]
})
export class MarkEnterPageModule { }
