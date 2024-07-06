import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpencesPageRoutingModule } from './expences-routing.module';

import { ExpencesPage } from './expences.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpencesPageRoutingModule
  ],
  declarations: [ExpencesPage]
})
export class ExpencesPageModule {}
