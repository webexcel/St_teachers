import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PinchZoomModule } from '@meddv/ngx-pinch-zoom';
import { TranModule } from '../tran.module';
import { MessagesRoutingModule } from './messages-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    IonicModule,
    TranModule,
    PinchZoomModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MessagesModule {}
