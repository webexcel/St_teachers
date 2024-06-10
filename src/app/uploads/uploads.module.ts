import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadsPageRoutingModule } from './uploads-routing.module';

import { UploadsPage } from './uploads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadsPageRoutingModule
  ],
  declarations: [UploadsPage]
})
export class UploadsPageModule {}
