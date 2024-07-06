import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbsenteesPageRoutingModule } from './absentees-routing.module';

import { AbsenteesPage } from './absentees.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbsenteesPageRoutingModule
  ],
  declarations: [AbsenteesPage]
})
export class AbsenteesPageModule {}
