import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { StudyMaterialRoutingModule } from './study-material-routing.module';
import { StudyMaterialComponent } from './study-material.component';

@NgModule({
  declarations: [StudyMaterialComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    StudyMaterialRoutingModule,
    IonicSelectableComponent,
  ],
})
export class StudyMaterialModule {}
