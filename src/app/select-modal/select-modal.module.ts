import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SelectModalComponent } from './select-modal.component';
import { BrowserModule } from '@angular/platform-browser'

@NgModule({
  declarations: [SelectModalComponent],
  imports: [CommonModule, FormsModule, IonicModule, BrowserModule],
  exports: [SelectModalComponent],
})
export class SelectModalModule {}