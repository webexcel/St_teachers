import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryPageRoutingModule } from './gallery-routing.module';

import { TranModule } from '../tran.module';
import { GalleryPage } from './gallery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryPageRoutingModule,
    TranModule
  ],
  declarations: [GalleryPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GalleryPageModule { }
