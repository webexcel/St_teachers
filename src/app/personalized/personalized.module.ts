import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranModule } from '../tran.module';
import { PersonalizedRoutingModule } from './personalized-routing.module';
import { PersonalizedComponent } from './personalized.component';

@NgModule({
  declarations: [PersonalizedComponent],
  imports: [
    CommonModule,
    PersonalizedRoutingModule,
    IonicModule,
    TranModule,
    IonicSelectableModule,
    FormsModule,
    TabsModule.forRoot(),
  ],
})
export class PersonalizedModule {}
